package com.example.onlysports.controller;

import com.example.onlysports.model.Jogo;
import com.example.onlysports.service.JogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/jogos")
public class JogoController {

    @Autowired
    private JogoService jogoService;

    // O SimpMessagingTemplate é usado para enviar mensagens *do servidor* para os clientes.
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // 1. Endpoint REST para o cliente buscar a lista inicial de jogos (GET)
    // O cliente chama isso primeiro, depois se inscreve no WebSocket.
    @GetMapping
    public ResponseEntity<List<Jogo>> listarJogosAoVivo() {
        return ResponseEntity.ok(jogoService.buscarJogosAoVivo());
    }

    // 2. Método administrativo/interno para ATUALIZAR o placar (Simulação de Fonte de Dados)
    // Em produção, isso seria chamado por um serviço de ingestão de dados, não por uma requisição manual.
    @PutMapping("/atualizar-placar/{jogoId}")
    public ResponseEntity<Jogo> atualizarPlacar(
            @PathVariable Long jogoId,
            @RequestParam int placarCasa,
            @RequestParam int placarVisitante) {

        Jogo jogoAtualizado = jogoService.atualizarPlacarEStatus(
                jogoId, placarCasa, placarVisitante
        );

        // Ação CRÍTICA: Envia a atualização instantaneamente para todos os clientes
        // inscritos no tópico /topic/jogos/{jogoId}.
        // O React Native estará ouvindo este tópico!
        messagingTemplate.convertAndSend("/topic/jogos/" + jogoId, jogoAtualizado);

        return ResponseEntity.ok(jogoAtualizado);
    }

    // 3. Exemplo de uso de @MessageMapping para o cliente enviar algo (ex: 'Estou assistindo')
    /*
    @MessageMapping("/jogo.assistindo/{jogoId}")
    public void assistindo(@DestinationVariable Long jogoId) {
        // Lógica para contar espectadores ou confirmar presença
    }
    */
}