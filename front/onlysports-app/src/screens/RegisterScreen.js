import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView, // Adicionado para melhor UX em teclados
  Platform, 
} from 'react-native';
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

const RegisterScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      const userData = await serviceApi.register(nome, email, senha);

      Alert.alert('Sucesso!', `Usuário ${userData.email} cadastrado! Faça login para continuar.`);
      
      // Navegar para a tela de Login
      navigation.navigate('Login'); 
      
    } catch (error) {
      Alert.alert('Erro no Cadastro', error.message || 'Falha na comunicação com o servidor.');
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
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Junte-se à comunidade OnlySports!</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor={COLORS.placeholder}
          value={nome}
          onChangeText={setNome}
        />

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
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.card} />
          ) : (
            <Text style={styles.buttonText}>CADASTRAR</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLinkText}>Já tem uma conta? <Text style={{fontWeight: 'bold'}}>Faça Login</Text></Text>
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
    // Sombra para um efeito 3D sutil
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
  loginLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginLinkText: {
    color: COLORS.text,
    fontSize: 14,
  }
});

export default RegisterScreen;