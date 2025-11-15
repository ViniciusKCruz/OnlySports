import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const LojaScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    const mockProducts = [
        { id: 1, name: 'Camisa Oficial Flamengo 2024', price: 299.90, club: 'Flamengo', image: '⚽' },
        { id: 2, name: 'Bola Oficial NBA 2024', price: 450.00, club: 'NBA', image: '🏀' },
        { id: 3, name: 'Boné Red Bull Racing F1', price: 189.90, club: 'Fórmula 1', image: '🏎️' },
        { id: 4, name: 'Cachecol Palmeiras Campeão', price: 89.90, club: 'Palmeiras', image: '🧣' },
        { id: 5, name: 'Camisa Treino São Paulo', price: 199.90, club: 'São Paulo', image: '👕' },
    ];

    const ProductCard = ({ product }) => (
        <View style={styles.card}>
            <Text style={styles.productImage}>{product.image}</Text>
            <Text style={styles.productClub}>{product.club}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>R$ {product.price.toFixed(2).replace('.', ',')}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => alert(`Produto ${product.name} adicionado ao carrinho!`)}>
                <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <Text style={styles.headerTitle}>Loja Oficial</Text>
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Checkout')}>
                    <Ionicons name="cart-outline" size={24} color="#0056b3" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
                <View style={styles.productList}>
                    {mockProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </View>

                <Text style={styles.infoText}>
                    Parcerias com clubes e ligas garantem a autenticidade e a qualidade dos produtos.
                    Processo de compra integrado e otimizado para a melhor experiência.
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    cartButton: {
        padding: 5,
    },
    scrollContent: {
        padding: 15,
        paddingBottom: 80,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%', // Dois cards por linha
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        fontSize: 40,
        marginBottom: 5,
    },
    productClub: {
        fontSize: 12,
        color: '#999',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 5,
        height: 35, // Altura fixa para evitar quebra de layout
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 10,
    },
    buyButton: {
        backgroundColor: '#FF3B30', 
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    infoText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 10,
    }
});

export default LojaScreen;
