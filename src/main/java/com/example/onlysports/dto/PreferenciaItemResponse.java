package com.example.onlysports.dto;

// DTO usado para retornar Times e Campeonatos disponíveis.

public class PreferenciaItemResponse {
    private Long id;
    private String nome;

    public PreferenciaItemResponse(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    // Setters (Opcionais, mas incluídos para completude)
    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}