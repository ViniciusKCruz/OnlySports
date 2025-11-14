package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "times")
public class Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTime;

    @Column(nullable = false)
    private String nome;

    private String tecnico; // Nome do treinador/técnico

    private String esporte; // Ex: "Futebol", "Basquete"

    private String logoUrl; // URL da logo do time

    // Relacionamento 1:N com Jogador
    @OneToMany(mappedBy = "time", cascade = CascadeType.ALL)
    private List<Jogador> jogadores;

    // Relacionamento para as preferências do usuário (N:M - Muitos para Muitos)
    // Opcional: Se for mapeado explicitamente no DB, usaremos uma tabela intermediária.
    // Para simplificar, pode-se usar as 'preferencias' em String/Set na classe Usuario.
}