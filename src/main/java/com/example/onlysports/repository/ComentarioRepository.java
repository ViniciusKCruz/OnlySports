package com.example.onlysports.repository;

import com.example.onlysports.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    // Busca todos os comentários aprovados de um jogo específico, ordenando do mais recente para o mais antigo.
    List<Comentario> findByJogoIdJogoAndAprovadoTrueOrderByDataHoraDesc(Long jogoId);
}