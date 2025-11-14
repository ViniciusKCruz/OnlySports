package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "comentarios")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idComentario;

    @Lob
    @Column(nullable = false)
    private String conteudo;

    @Column(nullable = false)
    private LocalDateTime dataHora = LocalDateTime.now();

    // Campo para Moderação (assume-se que é aprovado, a menos que seja reportado/removido)
    @Column(nullable = false)
    private boolean aprovado = true;

    // Relacionamento N:1 (Um comentário pertence a Um Usuário)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // Relacionamento N:1 (Um comentário pertence a Um Jogo)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jogo_id", nullable = false)
    private Jogo jogo;
}