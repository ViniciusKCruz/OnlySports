import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    ActivityIndicator, 
    FlatList,
    Alert,
    Dimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext'; 
import { Ionicons } from '@expo/vector-icons';

// Pega a largura da tela para responsividade
const { width } = Dimensions.get('window');
const ITEM_MARGIN = 10;
const ITEM_WIDTH = (width - ITEM_MARGIN * 3) / 2; 

// --- Dados Mockados (Simulação de dados da API) ---
const mockTeams = [
    { id: 't1', name: 'Flamengo', logo: '⚽' },
    { id: 't2', name: 'Palmeiras', logo: '⚽' },
    { id: 't3', name: 'São Paulo', logo: '⚽' },
    { id: 't4', name: 'Corinthians', logo: '⚽' },
    { id: 't5', name: 'Red Bull', logo: '🏎️' },
    { id: 't6', name: 'Mercedes', logo: '🏎️' },
    { id: 't7', name: 'Los Angeles Lakers', logo: '🏀' },
    { id: 't8', name: 'Golden State Warriors', logo: '🏀' },
];

const mockLeagues = [
    { id: 'l1', name: 'Brasileirão Série A', icon: '🏆' },
    { id: 'l2', name: 'Fórmula 1', icon: '🏎️' },
    { id: 'l3', name: 'NBA', icon: '🏀' },
    { id: 'l4', name: 'UEFA Champions League', icon: '⚽' },
    { id: 'l5', name: 'Mundial de Clubes', icon: '🌎' },
];

// --- Componente: Cartão de Item de Preferência ---
const PreferenceCard = React.memo(({ item, isSelected, onToggle }) => (
    <TouchableOpacity 
        style={[
            styles.card, 
            { width: ITEM_WIDTH }, 
            isSelected && styles.cardSelected
        ]}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.7}
    >
        <Text style={styles.cardLogo}>{item.logo || item.icon}</Text>
        <Text style={styles.cardText} numberOfLines={2}>{item.name}</Text>
        <View style={styles.selectionIndicator}>
            <Ionicons 
                name={isSelected ? "checkmark-circle" : "add-circle-outline"} 
                size={24} 
                color={isSelected ? "#4CAF50" : "#999"} 
            />
        </View>
    </TouchableOpacity>
));

const PreferencesScreen = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const isInitialSetup = route.params?.isInitialSetup || false; 

    const { userData, saveUserPreferences, isLoading: isAuthLoading } = useAuth();
    
    const [selectedTeams, setSelectedTeams] = useState(userData?.preferencias?.times || []);
    const [selectedLeagues, setSelectedLeagues] = useState(userData?.preferencias?.campeonatos || []);
    
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // --- Lógica de Carregamento de Dados Mockados ---
    useEffect(() => {
        if (isAuthLoading) return;

        setIsLoadingData(true);
        setTimeout(() => {
            setIsLoadingData(false);
        }, 800);
    }, [isAuthLoading]);

    // --- Lógica de Toggle (Seleção/Deseleção) ---
    const toggleSelection = (id, currentList, setter) => {
        if (currentList.includes(id)) {
            setter(currentList.filter(item => item !== id));
        } else {
            setter([...currentList, id]);
        }
    };

    const toggleTeam = (id) => toggleSelection(id, selectedTeams, setSelectedTeams);
    const toggleLeague = (id) => toggleSelection(id, selectedLeagues, setSelectedLeagues);

    // --- NOVA FUNÇÃO: Tratamento de Voltar de forma segura ---
    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            // Se não puder voltar, navega para a Home
            navigation.replace('Home'); 
        }
    };

    // --- Lógica de Salvar Preferências ---
    const handleSavePreferences = async () => {
        if (typeof saveUserPreferences !== 'function') {
            Alert.alert("Erro de Contexto", "A função de salvar preferências não está disponível.");
            return;
        }

        if (isSaving) return;

        if (selectedTeams.length === 0 && selectedLeagues.length === 0) {
            Alert.alert(
                "Atenção", 
                "Por favor, selecione pelo menos um time ou campeonato para continuar."
            );
            return;
        }

        setIsSaving(true);

        const success = await saveUserPreferences(selectedTeams, selectedLeagues);

        try {
            if (success) {
                // Feedback de sucesso
                Alert.alert(
                    "Sucesso", 
                    "Suas preferências foram salvas!", 
                    [{ text: "OK", onPress: () => {
                        // Navegação segura após salvar
                        if (isInitialSetup) {
                            navigation.replace('Home');
                        } else {
                            // Se não for setup inicial, tenta voltar ou vai para Home
                            handleGoBack();
                        }
                    }}]
                );
            } else {
                Alert.alert("Erro", "Não foi possível salvar as preferências. Tente novamente.");
            }

        } catch (error) {
            console.error("Erro ao salvar preferências:", error);
            Alert.alert("Erro", "Ocorreu um erro inesperado ao salvar. Tente novamente.");
        } finally {
            setIsSaving(false);
        }
    };
    
    // --- Renderização de Loading ---
    if (isLoadingData || isAuthLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0056b3" />
                <Text style={styles.loadingText}>Preparando o seu painel de preferências...</Text>
            </SafeAreaView>
        );
    }
    
    // --- Funções de Renderização do FlatList ---
    const renderTeamItem = ({ item }) => (
        <PreferenceCard
            item={item}
            isSelected={selectedTeams.includes(item.id)}
            onToggle={toggleTeam}
        />
    );

    const renderLeagueItem = ({ item }) => (
        <PreferenceCard
            item={item}
            isSelected={selectedLeagues.includes(item.id)}
            onToggle={toggleLeague}
        />
    );


    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {!isInitialSetup && (
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#0056b3" />
                    </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>
                    {isInitialSetup ? "Selecione Suas Preferências" : "Editar Preferências"}
                </Text>
                <View style={styles.placeholder} /> 
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Seção Times */}
                <Text style={styles.sectionTitle}>Seus Times Favoritos</Text>
                <FlatList
                    data={mockTeams}
                    renderItem={renderTeamItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={false} 
                    columnWrapperStyle={styles.columnWrapper}
                    ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum time disponível.</Text>}
                />

                <View style={styles.separator} />

                {/* Seção Campeonatos */}
                <Text style={styles.sectionTitle}>Seus Campeonatos Favoritos</Text>
                <FlatList
                    data={mockLeagues}
                    renderItem={renderLeagueItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.columnWrapper}
                    ListEmptyComponent={<Text style={styles.emptyListText}>Nenhum campeonato disponível.</Text>}
                />

            </ScrollView>

            {/* Sticky Footer com botão Salvar/Continuar */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={handleSavePreferences}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>
                            {isInitialSetup ? "Continuar para o Feed" : "Salvar Alterações"}
                        </Text>
                    )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 10,
        color: '#666',
    },
    // --- Header ---
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
        flex: 1,
        textAlign: 'center',
    },
    backButton: {
        padding: 10,
    },
    placeholder: { // Para balancear o layout quando o botão Voltar não estiver presente
        width: 44, 
    },
    // --- Scroll Content ---
    scrollContent: {
        paddingHorizontal: ITEM_MARGIN,
        paddingBottom: 20, // Espaço extra para o ScrollView não ficar sob o footer
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0056b3',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 15,
        marginHorizontal: 5,
    },
    emptyListText: {
        textAlign: 'center',
        color: '#999',
        padding: 20,
        width: '100%',
    },
    // --- Cards de Preferência ---
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: ITEM_WIDTH * 0.7, // Altura baseada na largura para ser responsivo
        borderWidth: 2,
        borderColor: '#ddd',
        position: 'relative',
        marginHorizontal: ITEM_MARGIN / 2, // Espaçamento entre os cards
    },
    cardSelected: {
        borderColor: '#0056b3',
        backgroundColor: '#e6f0ff', // Azul claro para seleção
    },
    cardLogo: {
        fontSize: 30,
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginTop: 5,
    },
    selectionIndicator: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    // --- Footer/Botão Salvar ---
    footer: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingHorizontal: 20,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 5,
    },
    saveButton: {
        backgroundColor: '#0056b3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PreferencesScreen;