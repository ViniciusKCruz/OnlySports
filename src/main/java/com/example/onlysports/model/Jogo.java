package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "jogos")
public class Jogo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idJogo;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    private String local;

    // Relacionamento N:1 (Um jogo tem UM Campeonato)
    @ManyToOne
    @JoinColumn(name = "campeonato_id", nullable = false)
    private Campeonato campeonato;

    // Relacionamento N:1 (Um jogo tem DOIS Times)
    @ManyToOne
    @JoinColumn(name = "time_casa_id", nullable = false)
    private Time timeCasa;

    @ManyToOne
    @JoinColumn(name = "time_visitante_id", nullable = false)
    private Time timeVisitante;

    // Placar (Crítico para US-003 - Tempo Real)
    private Integer placarCasa = 0;
    private Integer placarVisitante = 0;

    // Status do jogo (Crítico para US-003)
    @Enumerated(EnumType.STRING)
    private StatusJogo status = StatusJogo.AGENDADO;

    // Relacionamento 1:N com Comentários (US-005)
    @OneToMany(mappedBy = "jogo", cascade = CascadeType.ALL)
    private List<Comentario> comentarios;
}