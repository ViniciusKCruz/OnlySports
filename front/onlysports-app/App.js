import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet, StatusBar, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importe o Provider E o Hook do Contexto
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Telas 
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AuthenticatedTabs from './src/screens/AuthenticatedTabs'; // Importa o novo Tab Navigator

const Stack = createNativeStackNavigator();

// ----------------------------------------------------------------------
// 1. STACK DE TELAS NÃO AUTENTICADAS
// ----------------------------------------------------------------------
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);


// ----------------------------------------------------------------------
// 2. NAVEGADOR PRINCIPAL (APPNORMAL)
// ----------------------------------------------------------------------
const AppNavigator = () => {
  const { isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando sessão...</Text>
      </View>
    );
  }

  // Se estiver autenticado, usa o Tab Navigator, senão usa o AuthStack
  return (
    isAuthenticated ? <AuthenticatedTabs /> : <AuthStack />
  );
};


// ----------------------------------------------------------------------
// 3. COMPONENTE APP PRINCIPAL
// ----------------------------------------------------------------------
const App = () => (
  <SafeAreaProvider>
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#666'
  }
});

export default App;
