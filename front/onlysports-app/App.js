import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importe todos os componentes necessários do React Native para evitar o erro StyleSheet
import { ActivityIndicator, View, StyleSheet, StatusBar, Text } from 'react-native';

// Importe o Provider E o Hook do Contexto
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Telas 
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import PreferencesScreen from './src/screens/PreferencesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// NOVAS TELAS DE CONFIGURAÇÃO
import ProfileInfoScreen from './src/screens/ProfileInfoScreen';
import SecurityScreen from './src/screens/SecurityScreen';

const Stack = createNativeStackNavigator();

// ----------------------------------------------------------------------
// 1. STACK DE TELAS AUTENTICADAS (COM LÓGICA DE REDIRECIONAMENTO)
// ----------------------------------------------------------------------
const AuthenticatedStack = () => {
  // Pega o estado do usuário do contexto
  const { userData } = useAuth();

  // CORREÇÃO PARA TELA BRANCA: Se o usuário estiver autenticado, mas os dados 
  // do usuário (userData) ainda não estiverem disponíveis, mostre o loading.
  // Isso impede que o código tente acessar 'userData.preferencias' em um objeto nulo.
  if (!userData) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Carregando dados do usuário...</Text>
          </View>
      );
  }

  // O restante do código só é executado se userData for válido
  // CORRIGIDO: Usando 'times' e 'campeonatos' se essas forem as chaves corretas no objeto userData
  const hasPreferences = userData?.preferencias?.times?.length > 0 || userData?.preferencias?.campeonatos?.length > 0;

  // A rota inicial é 'Home' se tiver preferências, senão é 'Preferences'
  const initialRoute = hasPreferences ? 'Home' : 'Preferences';

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />

      {/* NOVAS ROTAS DE CONFIGURAÇÃO */}
      <Stack.Screen name="ProfileInfo" component={ProfileInfoScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      {/* FIM NOVAS ROTAS */}

      <Stack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={({ route, navigation }) => ({
          headerShown: false,
          // Desabilita o gesto de voltar se as preferências forem obrigatórias
          gestureEnabled: initialRoute === 'Home',
        })}
      />
    </Stack.Navigator>
  );
}


// ----------------------------------------------------------------------
// 2. STACK DE TELAS NÃO AUTENTICADAS
// ----------------------------------------------------------------------
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    {/* O nome da rota é 'Login', e não 'LoginScreen' */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);


// ----------------------------------------------------------------------
// 3. NAVEGADOR PRINCIPAL (APPNORMAL)
// Onde usamos o hook useAuth()
// ----------------------------------------------------------------------
const AppNavigator = () => {
  // Pegando as variáveis corretas do contexto
  const { isAuthenticated, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando sessão...</Text>
      </View>
    );
  }

  // Se estiver autenticado, usa o stack com o fluxo de preferências, senão usa o AuthStack
  return (
    isAuthenticated ? <AuthenticatedStack /> : <AuthStack />
  );
};


// ----------------------------------------------------------------------
// 4. COMPONENTE APP PRINCIPAL (Onde o Provider deve envolver o Navigator)
// ----------------------------------------------------------------------
const App = () => (
  <AuthProvider>
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {/* AppNavigator usa o useAuth(), então deve estar dentro do AuthProvider */}
      <AppNavigator />
    </NavigationContainer>
  </AuthProvider>
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
