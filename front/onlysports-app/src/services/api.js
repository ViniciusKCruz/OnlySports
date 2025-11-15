// api.js

// URL base da sua API Backend. 
// Certifique-se de que esta é a URL correta onde seu servidor Backend está rodando.
// Exemplo: 'http://10.0.2.2:8080' para rodar no emulador Android
const API_BASE_URL = 'http://192.168.0.100:8080'; // SUBSTITUA pelo seu IP local ou URL do servidor!

// Função auxiliar para requisições
const request = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    // Em um app real, você obteria o token de autenticação de um armazenamento seguro (AsyncStorage)
    // ou do AuthContext, mas como não podemos acessá-los diretamente aqui, 
    // faremos a requisição sem o token, esperando que o contexto o gerencie.
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // A lógica de Authorization deve ser implementada aqui quando o token for acessível.
    // if (token) { headers['Authorization'] = `Bearer ${token}`; }

    const config = {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : null,
        // Omitindo outras opções para manter o código mais limpo
    };

    try {
        const response = await fetch(url, config);
        
        if (response.status === 204) {
            return true; // Sucesso sem conteúdo (Ex: PUT/DELETE)
        }

        const data = await response.json();

        if (!response.ok) {
            // Lança um erro com a mensagem do backend
            throw new Error(data.message || `Erro de API: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error(`Falha na requisição para ${endpoint}:`, error);
        // Garante que o erro seja relançado para ser capturado no LoginScreen ou PreferencesScreen
        throw error; 
    }
};

// --- 1. FUNÇÕES DE AUTENTICAÇÃO ---

/**
 * Realiza o login do usuário.
 * @returns {Promise<{token: string, userData: object}>}
 */
export const login = async (email, password) => {
    try {
        // Exemplo: return await request('/auth/login', { method: 'POST', body: { email, password } });
        
        // SIMULAÇÃO: Sucesso no Login
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        return {
            token: 'mock-auth-token-123',
            userData: {
                id: 1,
                name: 'Usuário Teste',
                email: email,
                preferencias: {
                    times: [1, 3], // Mock de preferências salvas
                    campeonatos: [102]
                }
            }
        }; 
    } catch (error) {
        console.error('Erro no login:', error.message);
        throw new Error(error.message || 'Falha na autenticação. Verifique suas credenciais.');
    }
};

/**
 * Realiza o registro de um novo usuário.
 * @returns {Promise<{token: string, userData: object}>}
 */
export const register = async (name, email, password) => {
    try {
        // Exemplo: return await request('/auth/register', { method: 'POST', body: { name, email, password } });
        
        // SIMULAÇÃO: Sucesso no Registro
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        return {
            token: 'mock-auth-token-456',
            userData: {
                id: 2,
                name: name,
                email: email,
                preferencias: null // Novo usuário não tem preferências
            }
        };
    } catch (error) {
        console.error('Erro no registro:', error.message);
        throw new Error(error.message || 'Falha ao registrar usuário. Tente novamente.');
    }
};

// --- 2. FUNÇÕES DE PREFERÊNCIAS ---

/**
 * Busca a lista de times e campeonatos disponíveis no backend.
 * @returns {Promise<{teams: Array<{id: number, name: string}>, championships: Array<{id: number, name: string}>}>}
 */
export const fetchPreferencesData = async () => {
    console.log("SIMULANDO: Chamada fetchPreferencesData ao Backend...");
    
    // Simulação de delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    // Dados Mockados para teste:
    return {
        teams: [
            { id: 1, name: 'Flamengo' },
            { id: 2, name: 'Palmeiras' },
            { id: 3, name: 'São Paulo' },
            { id: 4, name: 'Corinthians' },
            { id: 5, name: 'Grêmio' },
            { id: 6, name: 'Internacional' },
            { id: 7, name: 'Atlético-MG' },
        ],
        championships: [
            { id: 101, name: 'Brasileirão Série A' },
            { id: 102, name: 'Copa Libertadores' },
            { id: 103, name: 'Copa do Brasil' },
            { id: 104, name: 'Premier League' },
        ],
    };
};

/**
 * Salva as preferências do usuário no backend.
 * @param {{times: number[], campeonatos: number[]}} preferencesPayload 
 * @returns {Promise<boolean>} True se for salvo com sucesso.
 */
export const savePreferences = async (preferencesPayload) => {
    try {
        // Exemplo: await request('/preferences/save', { method: 'POST', body: preferencesPayload }); return true;
        
        console.log("SIMULANDO: Salvamento de Preferências:", preferencesPayload);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return true; 
    } catch (error) {
        console.error('Erro ao salvar preferências:', error.message);
        throw new Error(error.message || 'Falha ao salvar preferências.');
    }
};

// --- OUTRAS FUNÇÕES ---

// Função Placeholder para o Home
export const fetchNewsFeed = async () => {
    // return request('/feed/news');
    return []; 
};
