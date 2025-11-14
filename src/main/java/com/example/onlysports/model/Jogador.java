package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "jogadores")
public class Jogador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idJogador;

    @Column(nullable = false)
    private String nome;

    private String posicao;

    private LocalDate dataNascimento;

    // Relacionamento N:1 (Muitos Jogadores pertencem a Um Time)
    @ManyToOne
    @JoinColumn(name = "time_id", nullable = false)
    private Time time;

    // Estatísticas críticas podem ser agregadas aqui ou em uma tabela separada (US-004).
    // Para simplicidade inicial, podemos usar campos JSON ou um campo 'Estatistica'
    // Se for em tabela separada, usar @OneToMany com a Entidade Estatistica.
}