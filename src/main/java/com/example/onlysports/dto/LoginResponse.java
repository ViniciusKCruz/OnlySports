package com.example.onlysports.dto;

public record LoginResponse(
        String message,
        String jSessionId // Campo para o ID da sessão
) {}