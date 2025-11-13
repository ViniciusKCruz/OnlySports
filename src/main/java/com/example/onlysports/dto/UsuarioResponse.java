// UsuarioResponse.java (DTO de saída, para não expor a senha no retorno)
package com.example.onlysports.dto;

import com.example.onlysports.model.TipoConta;

public record UsuarioResponse(
        Long idUsuario,
        String nome,
        String email,
        TipoConta tipoConta
) {}