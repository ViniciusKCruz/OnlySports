package com.example.onlysports.service;

import com.example.onlysports.dto.PreferenciasRequest;
import com.example.onlysports.model.Usuario;
import com.example.onlysports.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Método para buscar o usuário logado
    public Usuario buscarUsuarioPorId(Long idUsuario) {
        return usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado."));
    }

    // Método principal para atualizar as preferências
    public Usuario atualizarPreferencias(Long idUsuario, PreferenciasRequest request) {
        // 1. Busca o usuário para garantir que ele existe
        Usuario usuario = buscarUsuarioPorId(idUsuario);

        // 2. Atualiza a lista de preferências (Condição de Aceitação 1 de US-002)
        usuario.setPreferencias(request.preferencias());

        // 3. Salva a atualização no banco de dados
        return usuarioRepository.save(usuario);
    }
}
