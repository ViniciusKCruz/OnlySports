package com.example.onlysports.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // Habilita o processamento de mensagens WebSocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 1. Prefixo de destino (Broker)
        // Mensagens cujo destino começa com /topic serão roteadas para o Message Broker.
        // O cliente (React Native) se inscreve em tópicos como /topic/jogos/123
        config.enableSimpleBroker("/topic");

        // 2. Prefixo de Aplicação
        // Mensagens cujo destino começa com /app são roteadas para os Controllers (@MessageMapping).
        // Usaremos /app para o cliente enviar uma mensagem (se necessário).
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Define o endpoint onde o cliente irá se conectar (handshake)
        // O React Native irá se conectar a: ws://<backend-url>/ws-onlysports
        registry.addEndpoint("/ws-onlysports").setAllowedOriginPatterns("*").withSockJS();

        // setAllowedOriginPatterns("*") é para desenvolvimento. Em produção, use domínios específicos.
        // withSockJS() é um fallback para navegadores antigos (não estritamente necessário para React Native, mas boa prática).
    }
}
