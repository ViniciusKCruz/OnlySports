import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPreferencesData, savePreferences } from '../services/api'; 


const AuthContext = createContext();

const TOKEN_KEY = 'userToken';
const USER_DATA_KEY = 'userData';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [availablePreferences, setAvailablePreferences] = useState(null); 

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
                const storedUserData = await AsyncStorage.getItem(USER_DATA_KEY);
                
                if (storedToken && storedUserData) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUserData));
                }
            } catch (error) {
                console.error('Erro ao carregar dados de autenticação:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAuthData();
    }, []);

    const handleLogin = async (newToken, userData) => {
        try {
            setToken(newToken);
            setUser(userData);
            
            await AsyncStorage.setItem(TOKEN_KEY, newToken);
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

        } catch (error) {
            console.error('Erro ao processar login:', error);
            await handleLogout(); 
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem(TOKEN_KEY);
            await AsyncStorage.removeItem(USER_DATA_KEY);
            setToken(null);
            setUser(null);
            setAvailablePreferences(null);
        } catch (error) {
            console.error('Erro ao processar logout:', error);
        }
    };
    
    const loadAvailablePreferences = async () => {
        try {
            const data = await fetchPreferencesData();
            setAvailablePreferences(data);
            return data;
        } catch (error) {
            console.error('Erro ao carregar preferências disponíveis:', error);
            return { teams: [], championships: [] };
        }
    };
    
    const saveUserPreferences = async (selectedTeams, selectedChampionships) => {
        if (!user) return false;

        const payload = {
            userId: user.id, 
            teams: selectedTeams,
            championships: selectedChampionships
        };

        // Salva no backend
        const success = await savePreferences(payload);
        
        if (success) {
            const updatedUser = { 
                ...user, 
                preferencias: { times: selectedTeams, campeonatos: selectedChampionships } 
            };
            setUser(updatedUser);
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
            return true;
        }
        return false;
    };
    
    const updateUserData = async (newUserData) => {
        const finalUserData = { ...user, ...newUserData };
        
        setUser(finalUserData);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(finalUserData));
    };

    const authContextValue = useMemo(() => ({
        userData: user, 
        token,
        isLoading,
        availablePreferences, 
        isAuthenticated: !!token, 
        hasSetPreferences: user?.preferencias !== undefined, 
        
        handleLogin,
        handleLogout, 
        loadAvailablePreferences,
        saveUserPreferences, 
        updateUserData, 
    }), [user, token, isLoading, availablePreferences]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};