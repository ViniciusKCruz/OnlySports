// NotificacaoService.java
package com.example.onlysports.service;

import com.example.onlysports.model.Notificacao;
import com.example.onlysports.model.Usuario;
import com.example.onlysports.repository.NotificacaoRepository;
import com.example.onlysports.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // Para buscar usuários

    // Usado para enviar mensagens em tempo real via WebSocket (Tempo Real)
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Método para simular a criação de uma notificação e enviá-la
    // Em um sistema real, este método seria chamado por um evento (Ex: um gol)
    public void criarEEnviarNotificacao(String evento, String mensagem) {

        // Simulação de busca e filtro de usuários:
        List<Usuario> usuarios = usuarioRepository.findAll();

        for (Usuario usuario : usuarios) {
            // Lógica de FILTRO (US-006): Verifica se o evento é relevante
            // Aqui, o filtro ideal é complexo, mas simulamos verificando preferências:
            if (usuario.getPreferencias().contains(evento.toLowerCase())) {

                Notificacao novaNotificacao = new Notificacao();
                novaNotificacao.setUsuario(usuario);
                novaNotificacao.setMensagem(mensagem);
                novaNotificacao.setTipo(evento);

                // 1. Salva a notificação no banco de dados
                notificacaoRepository.save(novaNotificacao);

                // 2. Envia em tempo real para o usuário logado via WebSocket
                // O cliente React Native deve estar inscrito em: /topic/usuarios/{idUsuario}/notificacoes
                messagingTemplate.convertAndSend(
                        "/topic/usuarios/" + usuario.getIdUsuario() + "/notificacoes",
                        novaNotificacao.getMensagem()
                );
            }
        }
    }
}