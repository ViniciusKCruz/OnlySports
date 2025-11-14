// EstatisticaController.java
package com.example.onlysports.controller;

import com.example.onlysports.model.Estatistica;
import com.example.onlysports.service.EstatisticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estatisticas")
public class EstatisticaController {

    @Autowired
    private EstatisticaService estatisticaService;

    // GET /api/estatisticas/campeonatos/{id}/tabela
    @GetMapping("/campeonatos/{campeonatoId}/tabela")
    public ResponseEntity<String> getTabelaClassificacao(@PathVariable Long campeonatoId) {
        String tabelaJson = estatisticaService.buscarTabelaClassificacao(campeonatoId);
        // Retorna o JSON/String com os dados da tabela
        return ResponseEntity.ok(tabelaJson);
    }

    // GET /api/estatisticas/jogadores/{id}
    @GetMapping("/jogadores/{jogadorId}")
    public ResponseEntity<List<Estatistica>> getEstatisticasJogador(@PathVariable Long jogadorId) {
        List<Estatistica> estatisticas = estatisticaService.buscarEstatisticasPorJogador(jogadorId);
        return ResponseEntity.ok(estatisticas);
    }
}