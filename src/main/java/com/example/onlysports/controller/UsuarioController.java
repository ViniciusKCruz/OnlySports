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
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // GET /api/usuarios/me (Busca dados do usuário logado)
    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> getUsuarioLogado(@AuthenticationPrincipal Usuario usuarioLogado) {
        // O Spring Security injeta automaticamente o objeto Usuario logado
        UsuarioResponse response = new UsuarioResponse(
                usuarioLogado.getIdUsuario(),
                usuarioLogado.getNome(),
                usuarioLogado.getEmail(),
                usuarioLogado.getTipoConta()
        );
        return ResponseEntity.ok(response);
    }

    // PUT /api/usuarios/preferencias (Atualiza as preferências do usuário logado)
    @PutMapping("/preferencias")
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
                usuarioAtualizado.getTipoConta()
        );

        // O cliente (React Native) agora tem a lista de preferências atualizada.
        return ResponseEntity.ok(response);
    }
}