package com.example.onlysports.controller;

import com.example.onlysports.dto.PreferenciaItemResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/preferencias")
public class PreferenciaController {

    // Simula a busca por times disponíveis no banco de dados
    @GetMapping("/times")
    public ResponseEntity<List<PreferenciaItemResponse>> listarTimes() {
        // Mock de dados para fins de desenvolvimento
        List<PreferenciaItemResponse> times = Arrays.asList(
                new PreferenciaItemResponse(101L, "Flamengo"),
                new PreferenciaItemResponse(102L, "Palmeiras"),
                new PreferenciaItemResponse(103L, "Corinthians"),
                new PreferenciaItemResponse(104L, "São Paulo"),
                new PreferenciaItemResponse(105L, "Grêmio"),
                new PreferenciaItemResponse(106L, "Cruzeiro")
        );
        return ResponseEntity.ok(times);
    }

    // Simula a busca por campeonatos disponíveis no banco de dados
    @GetMapping("/campeonatos")
    public ResponseEntity<List<PreferenciaItemResponse>> listarCampeonatos() {
        // Mock de dados para fins de desenvolvimento
        List<PreferenciaItemResponse> campeonatos = Arrays.asList(
                new PreferenciaItemResponse(201L, "Campeonato Brasileiro Série A"),
                new PreferenciaItemResponse(202L, "Copa Libertadores"),
                new PreferenciaItemResponse(203L, "Copa Sul-Americana"),
                new PreferenciaItemResponse(204L, "Copa do Brasil")
        );
        return ResponseEntity.ok(campeonatos);
    }
}