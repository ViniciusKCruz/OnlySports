package com.example.onlysports.service;

import com.example.onlysports.dto.ComentarioRequest;
import com.example.onlysports.dto.ComentarioResponse;
import com.example.onlysports.model.Comentario;
import com.example.onlysports.model.Jogo;
import com.example.onlysports.model.Usuario;
import com.example.onlysports.repository.ComentarioRepository;
import com.example.onlysports.repository.JogoRepository; // Necessário para buscar o Jogo
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private JogoRepository jogoRepository; // Injete o JogoRepository

    // Posta um novo comentário (Condição de Aceitação 1 de US-005)
    public Comentario postarComentario(Long jogoId, Long usuarioId, ComentarioRequest request) {

        // 1. Busca o Jogo para garantir que o ID é válido
        Jogo jogo = jogoRepository.findById(jogoId)
                .orElseThrow(() -> new EntityNotFoundException("Jogo não encontrado."));

        // 2. Cria uma referência ao Usuário (o Spring Security injeta apenas o ID de forma eficiente)
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(usuarioId);

        // 3. Cria a entidade Comentario
        Comentario novoComentario = new Comentario();
        novoComentario.setConteudo(request.conteudo());
        novoComentario.setUsuario(usuario);
        novoComentario.setJogo(jogo);

        // A lógica de pré-moderação (filtragem de palavras) seria implementada aqui, se necessário.

        return comentarioRepository.save(novoComentario);
    }

    // Lista os comentários aprovados (Condição de Aceitação 2 de US-005)
    public List<ComentarioResponse> buscarComentariosPorJogo(Long jogoId) {
        // Usa o método do Repositório para buscar apenas os aprovados
        List<Comentario> comentarios = comentarioRepository.findByJogoIdJogoAndAprovadoTrueOrderByDataHoraDesc(jogoId);

        // Mapeia a lista de Entidades para a lista de DTOs de Resposta
        return comentarios.stream()
                .map(c -> new ComentarioResponse(
                        c.getIdComentario(),
                        c.getConteudo(),
                        c.getDataHora(),
                        c.getJogo().getIdJogo(),
                        c.getUsuario().getNome() // Retorna o nome do usuário para exibição
                ))
                .collect(Collectors.toList());
    }
}