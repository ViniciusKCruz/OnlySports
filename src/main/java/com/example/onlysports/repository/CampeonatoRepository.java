package com.example.onlysports.repository;

import com.example.onlysports.model.Campeonato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampeonatoRepository extends JpaRepository<Campeonato, Long> {
    // Métodos específicos para Campeonato podem ser adicionados aqui.
}