// JogoRepository.java
package com.example.onlysports.repository;

import com.example.onlysports.model.Jogo;
import com.example.onlysports.model.StatusJogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JogoRepository extends JpaRepository<Jogo, Long> {

    // Método usado para o US-003: buscar jogos que estão AO_VIVO
    List<Jogo> findByStatus(StatusJogo status);

    // Método útil para buscar jogos de um campeonato específico
    List<Jogo> findByCampeonatoIdCampeonato(Long campeonatoId);
}