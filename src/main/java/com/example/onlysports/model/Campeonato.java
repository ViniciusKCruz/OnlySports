package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "campeonatos")
public class Campeonato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCampeonato;

    @Column(nullable = false)
    private String nome;

    private String esporte;

    // Campo para a tabela de classificação (US-004)
    // Pode ser um JSON ou uma lista de objetos 'Classificacao' (se for modelado).
    // Por enquanto, usamos String para flexibilidade:
    @Lob // Para permitir textos longos (tabela inteira)
    private String tabelaClassificacao;

    private String temporada;

    // Relacionamento 1:N com Jogo (Um Campeonato tem Muitos Jogos)
    @OneToMany(mappedBy = "campeonato", cascade = CascadeType.ALL)
    private List<Jogo> jogos;
}