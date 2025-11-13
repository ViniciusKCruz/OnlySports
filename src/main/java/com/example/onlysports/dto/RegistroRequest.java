// RegistroRequest.java (DTO de entrada para o POST /register)
package com.example.onlysports.dto;

public record RegistroRequest(
        String nome,
        String email,
        String senha
) {}