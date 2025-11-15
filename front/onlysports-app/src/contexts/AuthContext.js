import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Funções que interagem com o backend para buscar dados e salvar
// Nota: Certifique-se de que '../services/api' exporta estas funções
import { fetchPreferencesData, savePreferences } from '../services/api'; 
// Importe outras funções de API se necessário, como 'login', 'register'

// 1. Cria o Contexto
const AuthContext = createContext();

// Chave para armazenar o token e dados do usuário no AsyncStorage
const TOKEN_KEY = 'userToken';
const USER_DATA_KEY = 'userData';

// 2. Cria o Provedor
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Estado para armazenar a lista COMPLETA de times/campeonatos disponíveis
    const [availablePreferences, setAvailablePreferences] = useState(null); 
    
    // ---------------------------------------------
    // FUNÇÃO 1: Carregar Token e Usuário ao Iniciar
    // ---------------------------------------------
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

    // ---------------------------------------------
    // FUNÇÃO 2: Processar Login
    // ---------------------------------------------
    const handleLogin = async (newToken, userData) => {
        try {
            // 1. Atualiza o estado
            setToken(newToken);
            setUser(userData);
            
            // 2. Salva no armazenamento persistente
            await AsyncStorage.setItem(TOKEN_KEY, newToken);
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

        } catch (error) {
            console.error('Erro ao processar login:', error);
            await handleLogout(); 
        }
    };

    // ---------------------------------------------
    // FUNÇÃO 3: Processar Logout (JÁ CORRETA)
    // ---------------------------------------------
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
    
    // ---------------------------------------------
    // FUNÇÃO 4: Carregar Preferências DISPONÍVEIS
    // ---------------------------------------------
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
    
    // ---------------------------------------------
    // FUNÇÃO 5: Salvar Preferências do Usuário (chaves teams/championships)
    // ---------------------------------------------
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
            // Atualiza o objeto user localmente
            const updatedUser = { 
                ...user, 
                // Nota: O PreferencesScreen usa 'preferencias', 'times', 'campeonatos' em português
                preferencias: { times: selectedTeams, campeonatos: selectedChampionships } 
            };
            setUser(updatedUser);
            await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
            return true;
        }
        return false;
    };
    
    // ---------------------------------------------
    // FUNÇÃO 6 (NOVA): Atualizar dados do usuário GENERICAMENTE
    // ---------------------------------------------
    const updateUserData = async (newUserData) => {
        // Garantir que o ID do usuário seja mantido
        const finalUserData = { ...user, ...newUserData };
        
        setUser(finalUserData);
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(finalUserData));
    };

    // 3. Objeto de Valor a ser Compartilhado (useMemo)
    const authContextValue = useMemo(() => ({
        // RENOMEADO: user (no estado) para userData (no contexto, para ser mais claro no componente)
        userData: user, 
        token,
        isLoading,
        availablePreferences, 
        isAuthenticated: !!token, 
        hasSetPreferences: user?.preferencias !== undefined, 
        
        // --- FUNÇÕES EXPOSTAS ---
        handleLogin,
        handleLogout, // Esta é a função que SettingsScreen irá chamar
        loadAvailablePreferences,
        saveUserPreferences, // Função de salvamento de preferências
        updateUserData, // Função genérica de atualização (corrigindo o erro original)
    }), [user, token, isLoading, availablePreferences]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Cria o Hook Customizado
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};