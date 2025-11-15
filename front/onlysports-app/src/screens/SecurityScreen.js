import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity, 
    TextInput, 
    ActivityIndicator,
    ScrollView, 
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componente para exibir mensagens de sucesso/erro (Toast)
const MessageBanner = ({ message, type, onDismiss }) => {
    if (!message) return null;
    
    const backgroundColor = type === 'success' ? '#1ABC9C' : '#E74C3C'; // Cores Verde/Vermelho de Segurança
    const iconName = type === 'success' ? 'checkmark-circle' : 'warning';

    return (
        <TouchableOpacity style={[styles.banner, { backgroundColor }]} onPress={onDismiss}>
            <Ionicons name={iconName} size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.bannerText}>{message}</Text>
            <Ionicons name="close" size={20} color="#fff" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
    );
};

// Componente de UI para o campo de formulário
const FormField = ({ label, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) => (
    <View style={styles.formGroup}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            keyboardType={keyboardType}
        />
    </View>
);

const SecurityScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { updatePassword } = useAuth(); // Assume uma função de contexto para alterar senha
    
    // Estados para o formulário de senha
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);

    // Estado para o Banner de Mensagem
    const [banner, setBanner] = useState({ message: '', type: '' });

    // Função de tratamento de navegação segura
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } 
    };

    // Função para mostrar o banner de mensagem
    const showBanner = (message, type = 'error') => {
        setBanner({ message, type });
        setTimeout(() => setBanner({ message: '', type: '' }), 4000); 
    };

    // ----------------------------------------------------
    // Lógica para Alterar Senha
    // ----------------------------------------------------
    const handleChangePassword = async () => {
        if (isLoadingPassword) return;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            showBanner("Todos os campos de senha são obrigatórios.", 'error');
            return;
        }
        if (newPassword.length < 6) {
            showBanner("A nova senha deve ter no mínimo 6 caracteres.", 'error');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            showBanner("A nova senha e a confirmação não coincidem.", 'error');
            return;
        }
        if (currentPassword === newPassword) {
            showBanner("A nova senha deve ser diferente da atual.", 'error');
            return;
        }

        setIsLoadingPassword(true);

        try {
            // Simulação de chamada de API para alterar a senha
            // Em uma aplicação real, você chamaria: await updatePassword(currentPassword, newPassword);
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const success = true; // Simulação de sucesso

            if (success) {
                showBanner("Senha alterada com sucesso!", 'success');
                // Limpa os campos após o sucesso
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                showBanner("Erro: Senha atual incorreta ou falha de servidor.", 'error');
            }
        } catch (error) {
            console.error("Erro ao alterar senha:", error);
            showBanner("Ocorreu um erro ao tentar alterar a senha.", 'error');
        } finally {
            setIsLoadingPassword(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            <MessageBanner 
                message={banner.message} 
                type={banner.type} 
                onDismiss={() => setBanner({ message: '', type: '' })}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Segurança da Conta</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Cartão de Alteração de Senha */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Alterar Senha de Acesso</Text>
                    
                    <FormField
                        label="Senha Atual"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry={true}
                    />
                    <FormField
                        label="Nova Senha"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={true}
                    />
                    <FormField
                        label="Confirmar Nova Senha"
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        secureTextEntry={true}
                    />
                    
                    <TouchableOpacity 
                        style={[styles.saveButton, isLoadingPassword && styles.disabledButton]} 
                        onPress={handleChangePassword}
                        disabled={isLoadingPassword}
                    >
                        {isLoadingPassword ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Confirmar Alteração de Senha</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Cartão de Outras Configurações de Segurança */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Outras Configurações</Text>
                    <TouchableOpacity style={styles.securityOption} onPress={() => showBanner("Simulando navegação para 2FA...", 'success')}>
                        <Text style={styles.optionText}>Autenticação de Dois Fatores (2FA)</Text>
                        <Ionicons name="chevron-forward" size={20} color="#7f8c8d" />
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity style={styles.securityOption} onPress={() => showBanner("Simulando navegação para Dispositivos Ativos...", 'success')}>
                        <Text style={styles.optionText}>Dispositivos Ativos</Text>
                        <Ionicons name="chevron-forward" size={20} color="#7f8c8d" />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8', 
    },
    // Banner de Mensagem (Toast) - Posição fixa no topo
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        position: 'absolute',
        top: 0, 
        left: 0,
        right: 0,
        zIndex: 10,
        paddingTop: 40, 
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    bannerText: {
        color: '#fff',
        fontWeight: 'bold',
        flexShrink: 1,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
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
    // Scroll Content
    scrollContent: {
        padding: 20,
        paddingBottom: 40, 
    },
    // Cards 
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 10,
    },
    // Formulário
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fcfcfc',
        borderWidth: 1,
        borderColor: '#e1e8ed',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#2c3e50',
    },
    // Botão de Senha
    saveButton: {
        backgroundColor: '#3498db', // Azul forte para ação principal de segurança
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#3498db',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#bdc3c7', 
        shadowOpacity: 0,
        elevation: 0,
    },
    // Opções de Segurança Adicionais
    securityOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    optionText: {
        fontSize: 16,
        color: '#34495e',
    },
    separator: {
        height: 1,
        backgroundColor: '#f5f5f5',
    }
});

export default SecurityScreen;