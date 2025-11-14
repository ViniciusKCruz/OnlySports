// EstatisticaService.java
package com.example.onlysports.service;

import com.example.onlysports.model.Campeonato;
import com.example.onlysports.model.Estatistica;
import com.example.onlysports.repository.CampeonatoRepository;
import com.example.onlysports.repository.EstatisticaRepository;
import com.example.onlysports.repository.JogadorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstatisticaService {

    @Autowired
    private CampeonatoRepository campeonatoRepository;

    @Autowired
    private EstatisticaRepository estatisticaRepository;

    // Condição de Aceitação 1: Consultar Tabela de Classificação
    public String buscarTabelaClassificacao(Long campeonatoId) {
        Campeonato campeonato = campeonatoRepository.findById(campeonatoId)
                .orElseThrow(() -> new EntityNotFoundException("Campeonato não encontrado."));

        // Retorna o campo String/JSON que guarda a tabela
        return campeonato.getTabelaClassificacao();
    }

    // Condição de Aceitação 2: Consultar Estatísticas de Jogadores
    public List<Estatistica> buscarEstatisticasPorJogador(Long jogadorId) {
        // Assume-se que o jogador existe; o repositório busca as estatísticas associadas.
        return estatisticaRepository.findByJogadorIdJogador(jogadorId);
    }
}