// AuthService.java
package com.example.onlysports.service;

import com.example.onlysports.dto.RegistroRequest;
import com.example.onlysports.model.TipoConta;
import com.example.onlysports.model.Usuario;
import com.example.onlysports.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Injetado do WebSecurityConfig (BCrypt)

    public Usuario cadastrarUsuario(RegistroRequest registroRequest) {

        // 1. Validação: Checa se o email já está em uso (Condição de Aceitação 1 de US-001)
        if (usuarioRepository.existsByEmail(registroRequest.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado. Tente outro.");
        }

        // 2. Cria a nova entidade
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(registroRequest.nome());
        novoUsuario.setEmail(registroRequest.email());

        // Criptografa a senha antes de salvar! (Condição de Aceitação 2 de US-001)
        novoUsuario.setSenha(passwordEncoder.encode(registroRequest.senha()));

        // Define o padrão inicial
        novoUsuario.setTipoConta(TipoConta.PADRAO);

        return usuarioRepository.save(novoUsuario);
    }
}