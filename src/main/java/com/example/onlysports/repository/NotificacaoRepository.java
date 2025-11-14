// NotificacaoRepository.java
package com.example.onlysports.repository;

import com.example.onlysports.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    // Adicione métodos de busca se necessário (ex: buscar por usuário)
    List<Notificacao> findByUsuarioIdUsuarioOrderByDataHoraDesc(Long usuarioId);
}