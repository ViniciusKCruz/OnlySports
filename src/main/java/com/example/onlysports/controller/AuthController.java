// AuthController.java
package com.example.onlysports.controller;

import com.example.onlysports.dto.RegistroRequest;
import com.example.onlysports.dto.UsuarioResponse;
import com.example.onlysports.model.Usuario;
import com.example.onlysports.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // POST /api/auth/register (Endpoint de Cadastro)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistroRequest request) {
        try {
            Usuario usuarioSalvo = authService.cadastrarUsuario(request);

            // Mapeia a entidade para o DTO de resposta
            UsuarioResponse response = new UsuarioResponse(
                    usuarioSalvo.getIdUsuario(),
                    usuarioSalvo.getNome(),
                    usuarioSalvo.getEmail(),
                    usuarioSalvo.getTipoConta()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IllegalArgumentException e) {
            // Retorna erro 400 (Bad Request) caso o email já exista
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /*
     * POST /api/auth/login (Endpoint de Login)
     * * Este endpoint não precisa de implementação manual, pois é interceptado
     * e processado automaticamente pelo Spring Security (formLogin)
     * com base nas credenciais (email e senha) enviadas pelo cliente.
     * * Se o login for bem-sucedido, o Spring responderá com sucesso (200 OK).
     */
}