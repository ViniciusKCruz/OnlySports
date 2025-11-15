import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext'; 

const ProfileInfoScreen = ({ navigation }) => {
    const { userData } = useAuth();
    
    // Estados iniciais mockados (você irá preencher com dados reais do userData)
    const [name, setName] = useState(userData?.name || 'Nome do Usuário');
    const [email, setEmail] = useState(userData?.email || 'email@exemplo.com');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        // Lógica de salvamento aqui (ex: chamada de API)
        setTimeout(() => {
            setIsLoading(false);
            setIsEditing(false);
            // Mensagem de sucesso/erro
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Informações do Perfil</Text>
                <TouchableOpacity 
                    onPress={() => isEditing ? handleSave() : setIsEditing(true)} 
                    style={styles.editButton}
                    disabled={isLoading}
                >
                    <Text style={[styles.editButtonText, isEditing && styles.saveButtonText]}>
                        {isLoading ? 'Salvando...' : (isEditing ? 'Salvar' : 'Editar')}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Formulário de Informações */}
            <View style={styles.form}>
                
                {/* Campo Nome */}
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    editable={isEditing}
                    placeholder="Seu nome completo"
                />

                {/* Campo Email (Geralmente não editável) */}
                <Text style={styles.label}>Email (Não Editável)</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={email}
                    editable={false}
                    placeholder="Seu email"
                />

                {/* Você pode adicionar mais campos aqui, como time preferido, etc. */}

                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#0056b3" />
                    </View>
                )}
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
    editButton: {
        minWidth: 60, 
        alignItems: 'flex-end',
        padding: 5,
    },
    editButtonText: {
        fontSize: 16,
        color: '#0056b3',
    },
    saveButtonText: {
        fontWeight: 'bold',
    },
    // Form
    form: {
        padding: 20,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#333',
    },
    disabledInput: {
        backgroundColor: '#eee',
        color: '#999',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    }
});

export default ProfileInfoScreen;