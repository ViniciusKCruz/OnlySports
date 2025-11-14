package com.example.onlysports.dto;

import java.time.LocalDateTime;

public record ComentarioResponse(
        Long idComentario,
        String conteudo,
        LocalDateTime dataHora,
        Long idJogo,
        String nomeUsuario
) {}