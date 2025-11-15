import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

// Componente de UI para o campo de formulário
const FormField = ({ label, value, onChangeText, secureTextEntry = false }) => (
    <View style={styles.formGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
        />
    </View>
);

const ProfileInfoScreen = ({ navigation }) => {
    const { userData, updateUserData } = useAuth();
    
    // Estados para os campos do perfil
    const [name, setName] = useState(userData?.name || '');
    const [email, setEmail] = useState(userData?.email || '');
    const [isLoading, setIsLoading] = useState(false);

    // Função de tratamento de navegação segura
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.replace('Home');
        }
    };

    const handleSave = async () => {
        if (isLoading) return;
        
        // Simulação de validação
        if (!name.trim() || !email.trim()) {
            Alert.alert("Erro", "Nome e Email não podem estar vazios.");
            return;
        }

        setIsLoading(true);

        try {
            // Simulação de chamada de API para salvar o perfil
            // Nota: Em um ambiente real, você chamaria uma função de API aqui, 
            // e updateUserData seria chamado APENAS SE a API fosse bem-sucedida.
            
            // Simulação de sucesso após 1 segundo
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const success = true; // Simulação de sucesso da API

            if (success) {
                // Atualiza o contexto APENAS se a API for bem-sucedida
                await updateUserData({ name, email }); 
                
                Alert.alert("Sucesso", "Informações do perfil atualizadas com sucesso!");
                handleGoBack();
            } else {
                Alert.alert("Erro", "Falha ao atualizar as informações do perfil.");
            }
        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
            Alert.alert("Erro", "Ocorreu um erro ao tentar salvar.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Informações do Perfil</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                <FormField
                    label="Nome Completo"
                    value={name}
                    onChangeText={setName}
                />
                <FormField
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                
                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        padding: 5,
    },
    placeholder: {
        width: 34, 
    },
    // Content
    content: {
        padding: 20,
        flex: 1,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#0056b3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileInfoScreen;