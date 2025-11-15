import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
// Use SafeAreaView e useSafeAreaInsets para lidar com barras de status/navegação
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons'; // Para ícones

// --- Componente: Item do Feed (Post Simulado) ---
const FeedItem = ({ post }) => (
    <View style={styles.postContainer}>
        <View style={styles.postHeader}>
            <Text style={styles.postSource}>{post.source}</Text>
            <Text style={styles.postTime}>{post.time}</Text>
        </View>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
        <View style={styles.postFooter}>
            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="heart-outline" size={20} color="#0056b3" />
                <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#0056b3" />
                <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

// --- Componente: Header Personalizado ---
const CustomHeader = ({ insets, userName }) => {
    // Lógica Corrigida: Verifica se o nome existe e não é uma string vazia (após remover espaços).
    // Se for válido, pega o primeiro nome; caso contrário, usa 'Usuário'.
    const firstName = (userName && userName.trim() !== '') 
        ? userName.trim().split(' ')[0] 
        : 'Usuário';

    return (
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <Text style={styles.headerTitle}>OnlySports</Text>
            
            {/* Usa o primeiro nome ou o fallback */}
            <Text style={styles.headerUserRight}>Olá, {firstName}!</Text>
        </View>
    );
};


const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { user } = useAuth(); 
    
    // Simulação de estado de feed
    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Dados de simulação (Serão substituídos pela chamada à API na US-003)
    const mockFeed = [
        { id: '1', title: 'Vitória Épica: Flamengo bate Palmeiras no Maracanã.', content: 'Em um jogo eletrizante, o Flamengo garantiu os 3 pontos com um gol no último minuto...', source: 'GE', time: '1h atrás', likes: 120, comments: 15 },
        { id: '2', title: 'Fórmula 1: Verstappen conquista pole position em Mônaco.', content: 'O piloto holandês da Red Bull demonstrou domínio total nos treinos classificatórios...', source: 'BandSports', time: '3h atrás', likes: 85, comments: 8 },
        { id: '3', title: 'NBA: Celtics avança para a final de conferência após varrer Sixers.', content: 'Mais uma performance dominante do time de Boston, que não deu chances ao adversário.', source: 'ESPN', time: '5h atrás', likes: 205, comments: 22 },
        { id: '4', title: 'Transferências: Richarlison entra na mira de gigante europeu.', content: 'Fontes indicam que o atacante brasileiro pode estar de mudança já na próxima janela de transferências...', source: 'ESPN', time: '8h atrás', likes: 60, comments: 5 },
    ];

    useEffect(() => {
        // Simula o carregamento dos dados do feed
        setTimeout(() => {
            setFeedData(mockFeed);
            setIsLoading(false);
        }, 1500); 
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        // Simula o recarregamento
        setTimeout(() => {
            setFeedData(mockFeed); 
            setIsLoading(false);
        }, 1000);
    };

    if (isLoading && feedData.length === 0) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0056b3" />
                <Text style={styles.loadingText}>Carregando seu feed...</Text>
            </SafeAreaView>
        );
    }
    
    // Obtém o nome completo do usuário ou uma string vazia como fallback inicial
    const userName = user?.nome || '';

    return (
        <SafeAreaView style={styles.container}>
            {/* Header com padding superior dinâmico e nome do usuário */}
            <CustomHeader 
                insets={insets} 
                userName={userName} 
            />
            
            {/* FlatList para o Feed */}
            <FlatList
                data={feedData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <FeedItem post={item} />}
                contentContainerStyle={styles.flatListContent}
                refreshing={isLoading}
                onRefresh={handleRefresh}
                ListHeaderComponent={() => (
                    <Text style={styles.feedHeader}>Últimas Notícias e Destaques</Text>
                )}
                ListEmptyComponent={() => !isLoading && (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="sad-outline" size={50} color="#666" />
                        <Text style={styles.emptyText}>Nenhum conteúdo encontrado. Ajuste suas preferências.</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Preferences')}>
                            <Text style={styles.linkText}>Ajustar preferências</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Simulação de um Bottom Bar para navegação */}
            <View style={[styles.bottomBar, { paddingBottom: insets.bottom }]}>
                {/* Botão de Feed (Ativo) */}
                <TouchableOpacity style={styles.bottomBarButton} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={24} color="#0056b3" />
                    <Text style={styles.bottomBarText}>Feed</Text>
                </TouchableOpacity>
                
                {/* Botão de Preferências */}
                <TouchableOpacity style={styles.bottomBarButton} onPress={() => navigation.navigate('Preferences')}>
                    <Ionicons name="list" size={24} color="#666" />
                    <Text style={styles.bottomBarTextInactive}>Preferências</Text>
                </TouchableOpacity>
                
                {/* Botão de Configurações */}
                <TouchableOpacity style={styles.bottomBarButton} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color="#666" />
                    <Text style={styles.bottomBarTextInactive}>Config</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    // --- Estilos do Header ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Mantém o título à esquerda e o texto à direita
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0056b3',
    },
    
    // Estilo para o canto superior direito
    headerUserRight: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        maxWidth: '50%', // Limita o tamanho para o texto do usuário
        textAlign: 'right',
    },

    profileButton: {
        padding: 5,
    },
    // --- Estilos do Feed ---
    flatListContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    feedHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
        marginBottom: 10,
    },
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    postSource: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0056b3',
    },
    postTime: {
        fontSize: 12,
        color: '#999',
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5,
        color: '#333',
    },
    postContent: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    postFooter: {
        flexDirection: 'row',
        marginTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    actionText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#0056b3',
    },
    // --- Estilos de Loading/Empty ---
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
    },
    linkText: {
        marginTop: 10,
        color: '#0056b3',
        fontWeight: 'bold',
    },
    // --- Estilos da Bottom Bar ---
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    bottomBarButton: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    bottomBarText: {
        fontSize: 12,
        color: '#0056b3',
        fontWeight: 'bold',
    },
    bottomBarTextInactive: {
        fontSize: 12,
        color: '#666',
    },
});

export default HomeScreen;