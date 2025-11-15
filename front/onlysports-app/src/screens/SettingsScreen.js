import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity, 
    ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
// Importação de ícones removida para evitar erro de dependência. Usaremos emojis/texto simples.


// Componente reutilizável para itens da lista
const SettingItem = ({ icon, label, onPress, isDestructive = false }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View style={styles.itemLeft}>
            {/* Cores hardcoded no componente para manter o estilo original, se necessário */}
            <Text style={{fontSize: 24, color: isDestructive ? '#dc3545' : '#0056b3', marginRight: 15 }}>{icon}</Text>
            <Text style={[styles.itemLabel, isDestructive && styles.destructiveText]}>
                {label}
            </Text>
        </View>
        {!isDestructive && (
            <Text style={{ fontSize: 20, color: '#ccc' }}>{'>'}</Text>
        )}
    </TouchableOpacity>
);


const SettingsScreen = ({ navigation }) => {
    const { userData, handleLogout } = useAuth(); 

    const nav = navigation;

    const handleActionLogout = () => {
        // Implementar confirmação de modal aqui (não usar alert())
        handleLogout();
        
        // A transição para a tela de Login será feita automaticamente pelo AppNavigator
        // quando o AuthContext atualizar isAuthenticated para false.
        // A chamada de navegação (reset) é desnecessária e causa o erro.

    };
    
    // A correção do erro de substring e robustez do ID está mantida:
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.backButton}>
                    <Text style={{ fontSize: 24, color: '#333' }}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configurações</Text>
                <View style={{ width: 34 }} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Informações da Conta */}
                <View style={styles.section}>
                    <Text style={styles.accountText}>
                        {/* CORREÇÃO ROBUSTA: Encadeamento opcional e verificação de tipo/tamanho */}
                        Conta de: {
                            (userData?.id && typeof userData.id === 'string' && userData.id.length > 8) 
                                ? `ID do Usuário (${userData.id.substring(0, 8)}...)` 
                                : (userData?.id && userData.id.length > 0 ? `ID: ${userData.id}` : 'Usuário Não Identificado')
                        }
                    </Text>
                </View>

                {/* Seção Geral */}
                <Text style={styles.sectionTitle}>Geral</Text>
                <View style={styles.card}>
                    <SettingItem 
                        icon="⚽"
                        label="Gerenciar Preferências Esportivas"
                        onPress={() => nav.navigate('Preferences')} 
                    />
                </View>

                {/* Seção Conta */}
                <Text style={styles.sectionTitle}>Conta</Text>
                <View style={styles.card}>
                    <SettingItem 
                        icon="👤"
                        label="Informações do Perfil"
                        onPress={() => nav.navigate('ProfileInfo')} 
                    />
                    <View style={styles.separator} />
                    <SettingItem 
                        icon="🔒"
                        label="Segurança e Senha"
                        onPress={() => nav.navigate('Security')} 
                    />
                </View>

                {/* Seção Ação (Logout) */}
                <View style={[styles.card, styles.logoutCard]}>
                    <SettingItem 
                        icon="🚪"
                        label="Sair da Conta"
                        onPress={handleActionLogout}
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
        // Adiciona um padding vertical para espaçamento no card de informações
        paddingVertical: 10, 
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
        marginLeft: 0,
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
