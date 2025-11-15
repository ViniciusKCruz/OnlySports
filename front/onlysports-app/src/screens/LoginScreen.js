import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import * as serviceApi from '../services/api'; 

// Cores do tema 
const COLORS = {
  primary: '#007AFF', 
  secondary: '#FF3B30', 
  background: '#F5F5F5', 
  card: '#FFFFFF', 
  text: '#333333', 
  placeholder: '#A0A0A0', 
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth(); 

  const handleLoginPress = async () => {
    if (!email || !password) {
      Alert.alert('Erro de Preenchimento', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await serviceApi.login(email, password); 
      await handleLogin(response.token, response.userData);
      
    } catch (error) {
      Alert.alert('Falha no Login', error.message || 'Ocorreu um erro desconhecido durante o login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Acesse o OnlySports</Text>
        <Text style={styles.subtitle}>Entre na sua conta para continuar</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={COLORS.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={COLORS.placeholder}
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
            <ActivityIndicator color={COLORS.card} />
          ) : (
            <Text style={styles.buttonText}>ENTRAR</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.registerLink} 
          onPress={() => navigation.navigate('Register')}
          disabled={loading}
        >
          <Text style={styles.registerLinkText}>Não tem uma conta? <Text style={{fontWeight: 'bold'}}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.placeholder,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: COLORS.text,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.card,
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerLinkText: {
    color: COLORS.text,
    fontSize: 14,
  }
});

export default LoginScreen;
