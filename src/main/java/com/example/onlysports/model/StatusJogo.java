package com.example.onlysports.model;

public enum StatusJogo {
    AGENDADO, // O jogo ainda não começou
    AO_VIVO,  // O jogo está em andamento (Tempo Real)
    INTERVALO,
    FINALIZADO, // O jogo terminou
    CANCELADO
}