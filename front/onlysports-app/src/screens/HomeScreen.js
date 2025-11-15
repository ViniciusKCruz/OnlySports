import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons'; // Para ícones

const FeedItem = ({ post, onLike, onComment }) => (
    <View style={styles.postContainer}>
        <View style={styles.postHeader}>
            <Text style={styles.postSource}>{post.source}</Text>
            <Text style={styles.postTime}>{post.time}</Text>
        </View>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
        <View style={styles.postFooter}>
            <TouchableOpacity style={styles.actionButton} onPress={() => onLike(post.id)}>
                <Ionicons name={post.isLiked ? "heart" : "heart-outline"} size={20} color={post.isLiked ? "#FF3B30" : "#0056b3"} />
                <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => onComment(post.id)}>
                <Ionicons name="chatbubble-outline" size={20} color="#0056b3" />
                <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const CustomHeader = ({ insets, userName }) => {
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

    const [feedData, setFeedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Dados de simulação (Serão substituídos pela chamada à API na US-003)
    const mockFeed = [
        { id: '1', title: 'Triunfo Épico: Flamengo bate Palmeiras no Maracanã.', content: 'Em um jogo eletrizante, o Flamengo garantiu os 3 pontos com um gol no último minuto...', source: 'GE', time: '1h atrás', likes: 120, comments: 15 },
        { id: '2', title: 'Fórmula 1: Verstappen conquista pole position em Mônaco.', content: 'O piloto holandês da Red Bull demonstrou domínio total nos treinos classificatórios...', source: 'BandSports', time: '3h atrás', likes: 85, comments: 8 },
        { id: '3', title: 'NBA: Lakers avança para a final de conferência após varrer Sixers.', content: 'Mais uma performance dominante do time de Boston, que não deu chances ao adversário.', source: 'ESPN', time: '5h atrás', likes: 205, comments: 22 },
        { id: '4', title: 'Transferências: Richarlison entra na mira de gigante europeu.', content: 'Fontes indicam que o atacante brasileiro pode estar de mudança já na próxima janela de transferências...', source: 'ESPN', time: '8h atrás', likes: 60, comments: 5 },
        { id: '5', title: 'Vôlei Feminino: Brasil vence a Sérvia e garante vaga na final do Mundial.', content: 'Com atuação impecável de Gabi, a seleção brasileira superou as atuais campeãs em sets diretos.', source: 'Globo Esporte', time: '10h atrás', likes: 150, comments: 18 },
        { id: '6', title: 'Tênis: Nadal anuncia retorno às quadras após longa pausa por lesão.', content: 'O touro Miúra confirmou sua participação no ATP 500 de Barcelona, reacendendo a esperança dos fãs.', source: 'Lance!', time: '12h atrás', likes: 310, comments: 45 },
        { id: '7', title: 'eSports: LOUD domina o CBLOL e conquista o tricampeonato consecutivo.', content: 'A equipe brasileira de League of Legends não deu chances aos adversários e se consolida como a maior força nacional.', source: 'The Enemy', time: '1 dia atrás', likes: 450, comments: 88 },
        { id: '8', title: 'Boxe: Jake Paul desafia Mike Tyson para revanche em 2025.', content: 'Após a polêmica luta de exibição, o youtuber americano propõe um novo confronto, desta vez com regras profissionais.', source: 'Combate', time: '2 dias atrás', likes: 95, comments: 12 },
        { id: '9', title: 'Futebol Feminino: Marta se despede da seleção em amistoso emocionante.', content: 'A rainha do futebol jogou seus últimos minutos com a camisa amarela, sendo ovacionada pela torcida no Pacaembu.', source: 'UOL Esporte', time: '3 dias atrás', likes: 550, comments: 112 }
    ];

    useEffect(() => {
        setTimeout(() => {
            setFeedData(mockFeed.map(post => ({ ...post, isLiked: false })));
            setIsLoading(false);
        }, 1500);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setFeedData(mockFeed.map(post => ({ ...post, isLiked: false })));
            setIsLoading(false);
        }, 1000);
    };

    if (isLoading && feedData.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0056b3" />
                <Text style={styles.loadingText}>Carregando seu feed...</Text>
            </View>
        );
    }

    const userName = user?.nome || '';

    const handleLike = (postId) => {
        setFeedData(prevData =>
            prevData.map(post =>
                post.id === postId
                    ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
                    : post
            )
        );
    };

    const handleComment = (post) => {
        // Navega para a tela de comentários, passando o ID e o título da notícia
        navigation.navigate('Comments', { postId: post.id, postTitle: post.title });
    };

    return (
        <View style={styles.container}>
            {/* Header com padding superior dinâmico e nome do usuário */}
            <CustomHeader
                insets={insets}
                userName={userName}
            />

            {/* FlatList para o Feed */}
            <FlatList
                data={feedData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <FeedItem post={item} onLike={handleLike} onComment={() => handleComment(item)} />}
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

            {/* O Bottom Bar foi removido e será substituído pelo Tab Navigator no App.js */}
        </View>
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
        justifyContent: 'space-between',
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
        maxWidth: '50%',
        textAlign: 'right',
    },

    profileButton: {
        padding: 5,
    },
    // --- Estilos do Feed ---
    flatListContent: {
        paddingHorizontal: 15,
        // O padding inferior deve ser um valor que compense a altura da Tab Bar (aprox. 70-80)
        // para que o último item da lista não fique escondido atrás dela.
        paddingBottom: 80,
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
});

export default HomeScreen;
