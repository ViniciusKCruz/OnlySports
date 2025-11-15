import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity, 
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

// Componente reutilizável para itens da lista
const SettingItem = ({ icon, label, onPress, isDestructive = false }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View style={styles.itemLeft}>
            {/* Cores hardcoded no componente para manter o estilo original, se necessário */}
            <Ionicons name={icon} size={24} color={isDestructive ? '#dc3545' : '#0056b3'} />
            <Text style={[styles.itemLabel, isDestructive && styles.destructiveText]}>
                {label}
            </Text>
        </View>
        {!isDestructive && (
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        )}
    </TouchableOpacity>
);


const SettingsScreen = ({ navigation }) => {
    // CORREÇÃO AQUI: Usando 'userData' e 'handleLogout'
    // conforme definido no useAuth do seu AuthContext
    const { userData, handleLogout } = useAuth(); 

    const handleActionLogout = () => {
        // Implementar confirmação de modal aqui (não usar alert())
        // Por enquanto, chamamos diretamente a função que limpa o token/dados
        handleLogout();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configurações</Text>
                <View style={{ width: 34 }} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Informações da Conta */}
                <View style={styles.section}>
                    <Text style={styles.accountText}>
                        Conta de: {userData?.id ? `ID do Usuário (${userData.id.substring(0, 8)}...)` : 'Usuário Não Identificado'}
                    </Text>
                </View>

                {/* Seção Geral */}
                <Text style={styles.sectionTitle}>Geral</Text>
                <View style={styles.card}>
                    <SettingItem 
                        icon="football-outline" 
                        label="Gerenciar Preferências Esportivas"
                        onPress={() => navigation.navigate('Preferences')} 
                    />
                </View>

                {/* Seção Conta */}
                <Text style={styles.sectionTitle}>Conta</Text>
                <View style={styles.card}>
                    <SettingItem 
                        icon="person-circle-outline" 
                        label="Informações do Perfil"
                        onPress={() => navigation.navigate('ProfileInfo')} 
                    />
                    <View style={styles.separator} />
                    <SettingItem 
                        icon="lock-closed-outline" 
                        label="Segurança e Senha"
                        onPress={() => navigation.navigate('Security')} 
                    />
                </View>

                {/* Seção Ação (Logout) */}
                <View style={[styles.card, styles.logoutCard]}>
                    <SettingItem 
                        icon="log-out-outline" 
                        label="Sair da Conta"
                        onPress={handleActionLogout} // Chamando a função corrigida
                        isDestructive={true}
                    />
                </View>

                <Text style={styles.versionText}>App Versão 1.0.0</Text>

            </ScrollView>
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
    scrollContent: {
        padding: 15,
    },
    // Seções
    section: {
        marginBottom: 10,
        alignItems: 'center',
    },
    accountText: {
        fontSize: 14,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
        marginBottom: 8,
    },
    // Cards
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLabel: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    destructiveText: {
        color: '#dc3545',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginLeft: 54, // Alinha com o texto, após o ícone
    },
    logoutCard: {
        marginTop: 20,
        borderColor: '#dc3545',
        borderWidth: 1,
    },
    versionText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 12,
        color: '#999',
    }
});

export default SettingsScreen;