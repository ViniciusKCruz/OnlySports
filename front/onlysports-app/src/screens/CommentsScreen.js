import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Mock de dados de comentários
const mockComments = [
    { id: 'c1', user: 'TorcedorFiel', text: 'Que vitória espetacular! O time está imparável.', time: '5 min atrás' },
    { id: 'c2', user: 'AnalistaEsportivo', text: 'A defesa precisa de ajustes, mas o ataque compensou.', time: '10 min atrás' },
    { id: 'c3', user: 'Maria_Gols', text: 'Já garanti meu ingresso para o próximo jogo!', time: '15 min atrás' },
];

const CommentItem = ({ comment }) => (
    <View style={styles.commentContainer}>
        <Text style={styles.commentUser}>{comment.user}</Text>
        <Text style={styles.commentText}>{comment.text}</Text>
        <Text style={styles.commentTime}>{comment.time}</Text>
    </View>
);

const CommentsScreen = ({ navigation }) => {
    const route = useRoute();
    const { postId, postTitle } = route.params;
    const [comments, setComments] = useState(mockComments);
    const [newComment, setNewComment] = useState('');

    const handlePostComment = () => {
        if (newComment.trim() === '') return;

        const newId = `c${comments.length + 1}`;
        const comment = {
            id: newId,
            user: 'Você (Usuário Logado)',
            text: newComment.trim(),
            time: 'Agora',
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} 
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Comentários</Text>
                <View style={{ width: 34 }} /> 
            </View>

            <Text style={styles.postTitle}>Notícia: {postTitle}</Text>

            <FlatList
                data={comments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <CommentItem comment={item} />}
                contentContainerStyle={styles.listContent}
                inverted // Para que os novos comentários apareçam em cima
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escreva seu comentário..."
                    value={newComment}
                    onChangeText={setNewComment}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handlePostComment}>
                    <Ionicons name="send" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
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
    postTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10, // Pequeno padding para o último item
    },
    commentContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    commentUser: {
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 2,
    },
    commentText: {
        fontSize: 16,
        color: '#333',
    },
    commentTime: {
        fontSize: 10,
        color: '#999',
        marginTop: 5,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    input: {
        flex: 1,
        maxHeight: 100,
        minHeight: 40,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        fontSize: 16,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0056b3',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CommentsScreen;
