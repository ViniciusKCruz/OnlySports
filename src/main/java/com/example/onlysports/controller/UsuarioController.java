package com.example.onlysports.controller;

import com.example.onlysports.dto.PreferenciasRequest;
import com.example.onlysports.dto.UsuarioResponse;
import com.example.onlysports.model.Usuario;
import com.example.onlysports.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
// CRÍTICO: Alterado de "/api/usuarios" para "/api/users" para corrigir o erro 404
// e alinhar com o Frontend (/api/users/me).
@RequestMapping("/api/users")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // GET /api/users/me (Busca dados do usuário logado)
    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> getUsuarioLogado(@AuthenticationPrincipal Usuario usuarioLogado) {
        // O Spring Security injeta automaticamente o objeto Usuario logado
        UsuarioResponse response = new UsuarioResponse(
                usuarioLogado.getIdUsuario(),
                usuarioLogado.getNome(),
                usuarioLogado.getEmail(),
                usuarioLogado.getPreferencias(), // Adicionando as preferências
                usuarioLogado.getTipoConta()
        );
        return ResponseEntity.ok(response);
    }

    // PUT /api/users/preferences (Atualiza as preferências do usuário logado)
    @PutMapping("/preferences")
    public ResponseEntity<UsuarioResponse> atualizarPreferencias(
            @AuthenticationPrincipal Usuario usuarioLogado,
            @RequestBody PreferenciasRequest request) {

        // Chama o service usando o ID do usuário que está logado
        Usuario usuarioAtualizado = usuarioService.atualizarPreferencias(
                usuarioLogado.getIdUsuario(),
                request
        );

        // Retorna a resposta atualizada
        UsuarioResponse response = new UsuarioResponse(
                usuarioAtualizado.getIdUsuario(),
                usuarioAtualizado.getNome(),
                usuarioAtualizado.getEmail(),
                usuarioAtualizado.getPreferencias(), // Retornando as preferências atualizadas
                usuarioAtualizado.getTipoConta()
        );

        return ResponseEntity.ok(response);
    }
}