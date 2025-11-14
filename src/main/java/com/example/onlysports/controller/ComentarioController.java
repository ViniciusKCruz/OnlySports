package com.example.onlysports.controller;

import com.example.onlysports.dto.ComentarioRequest;
import com.example.onlysports.dto.ComentarioResponse;
import com.example.onlysports.model.Comentario;
import com.example.onlysports.model.Usuario;
import com.example.onlysports.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jogos/{jogoId}/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    // GET /api/jogos/{jogoId}/comentarios
    // Lista todos os comentários aprovados para um jogo
    @GetMapping
    public ResponseEntity<List<ComentarioResponse>> listarComentarios(@PathVariable Long jogoId) {
        List<ComentarioResponse> comentarios = comentarioService.buscarComentariosPorJogo(jogoId);
        return ResponseEntity.ok(comentarios);
    }

    // POST /api/jogos/{jogoId}/comentarios
    // Permite que o usuário logado poste um novo comentário
    @PostMapping
    public ResponseEntity<ComentarioResponse> postarComentario(
            @PathVariable Long jogoId,
            @AuthenticationPrincipal Usuario usuarioLogado,
            @RequestBody ComentarioRequest request) {

        // Chama o service usando o ID do usuário logado e o conteúdo da requisição
        Comentario novoComentario = comentarioService.postarComentario(
                jogoId,
                usuarioLogado.getIdUsuario(),
                request
        );

        // Mapeia o resultado para o DTO de Resposta
        ComentarioResponse response = new ComentarioResponse(
                novoComentario.getIdComentario(),
                novoComentario.getConteudo(),
                novoComentario.getDataHora(),
                jogoId,
                usuarioLogado.getNome()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}