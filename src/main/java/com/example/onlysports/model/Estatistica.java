// Estatistica.java
package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "estatisticas")
public class Estatistica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstatistica;

    // Chave que indica o que esta estatística mede (Ex: "Gols", "Pontos")
    private String chave;

    // O valor da estatística
    private Double valor;

    // Relacionamento Opcional: A estatística pode ser de um jogador, de um time ou geral.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jogador_id")
    private Jogador jogador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "time_id")
    private Time time;
}