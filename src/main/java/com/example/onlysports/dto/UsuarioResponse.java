package com.example.onlysports.dto;

import com.example.onlysports.model.TipoConta;
import java.util.Set;

// Usando Record para um DTO imutável e conciso
public record UsuarioResponse(
        Long idUsuario,
        String nome,
        String email,
        Set<String> preferencias, // Adicionado para retornar a lista de preferências do usuário
        TipoConta tipoConta
) {}