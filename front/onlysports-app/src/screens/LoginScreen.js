import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// Certifique-se de que o caminho abaixo está correto:
import { useAuth } from '../contexts/AuthContext';
// A importação DEVE ser feita a partir de '../services/api'
import { login } from '../services/api'; 
// Observação: Não use loginUser, use apenas 'login'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Obtém a função de autenticação do contexto
  const { handleLogin } = useAuth(); 

  const handleLoginPress = async () => {
    if (!email || !password) {
      Alert.alert('Erro de Preenchimento', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      // 1. Chama a função de API 'login'
      const response = await login(email, password); 

      // 2. Se a API for bem-sucedida, chama a função do AuthContext para processar a resposta e o login
      // A função handleLogin (do AuthContext) se encarregará de salvar o token e o user data.
      await handleLogin(response.token, response.userData);
      
      // O App.js deve automaticamente redirecionar para a Home ou PreferencesScreen
      // após o estado do AuthContext ser atualizado.

    } catch (error) {
      // Usa Alert.alert em vez de console.error para mostrar o erro ao usuário
      Alert.alert('Falha no Login', error.message || 'Ocorreu um erro desconhecido durante o login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesse o OnlySports</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[styles.button, styles.primaryButton]} 
        onPress={handleLoginPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>ENTRAR</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]} 
        onPress={() => navigation.navigate('Register')}
        disabled={loading}
      >
        <Text style={styles.secondaryButtonText}>CADASTRAR-SE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#007AFF', // Azul primário
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;