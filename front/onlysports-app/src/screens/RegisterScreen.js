// src/screens/RegisterScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../services/api';

const RegisterScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Ação de clique do botão
  const handleRegister = async () => {
    // 1. Validação básica de campos vazios (antes de enviar)
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      // 2. Chama a API do Spring Boot
      const userData = await registerUser(nome, email, senha);

      // 3. Sucesso (HTTP 201)
      // Ajuste na mensagem de alerta para instruir o login
      Alert.alert('Sucesso!', `Usuário ${userData.email} cadastrado! Faça login para continuar.`);
      
      // Ação Corrigida: Navegar para a tela de Login
      navigation.navigate('Login'); 
      
    } catch (error) {
      // 4. Erro (Mensagem retornada pela API ou erro de rede)
      Alert.alert('Erro no Cadastro', error.message || 'Falha na comunicação com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta OnlySports</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry // Oculta a senha
      />

      <Button
        title={loading ? "Cadastrando..." : "CADASTRAR"}
        onPress={handleRegister}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default RegisterScreen;