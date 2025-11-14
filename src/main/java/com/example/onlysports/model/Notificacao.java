// Notificacao.java
package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "notificacoes")
public class Notificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNotificacao;

    @Column(nullable = false)
    private String mensagem;

    @Column(nullable = false)
    private LocalDateTime dataHora = LocalDateTime.now();

    private String tipo; // Ex: "GOL", "INICIO_JOGO"

    private boolean lida = false;

    // Relacionamento N:1 (Uma notificação pertence a Um Usuário)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}