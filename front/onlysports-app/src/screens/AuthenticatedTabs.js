import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Telas
import HomeScreen from './HomeScreen';
import PreferencesScreen from './PreferencesScreen';
import SettingsScreen from './SettingsScreen';
import LojaScreen from './LojaScreen'; // Nova tela

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



// ----------------------------------------------------------------------
// TAB NAVIGATOR PRINCIPAL
// ----------------------------------------------------------------------
const AuthenticatedTabs = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#0056b3',
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#eee',
                    // Ajuste de responsividade para dispositivos com notch (iPhone X, etc.)
                    paddingBottom: insets.bottom,
                    height: 55 + insets.bottom, // Altura base + área segura
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Feed') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Loja') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Preferências') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Configurações') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Feed" component={HomeScreen} />
            <Tab.Screen name="Loja" component={LojaScreen} />
            <Tab.Screen name="Preferências" component={PreferencesScreen} />
            <Tab.Screen name="Configurações" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default AuthenticatedTabs;
