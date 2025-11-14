// CampeonatoRepository.java
package com.example.onlysports.repository;

import org.springframework.data.jpa.repository.JpaRepository;

// JogadorRepository.java

import com.example.onlysports.model.Jogador;
import org.springframework.data.jpa.repository.JpaRepository;

// EstatisticaRepository.java


import com.example.onlysports.model.Estatistica;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EstatisticaRepository extends JpaRepository<Estatistica, Long> {
    List<Estatistica> findByJogadorIdJogador(Long jogadorId);
    List<Estatistica> findByTimeIdTime(Long timeId);
}