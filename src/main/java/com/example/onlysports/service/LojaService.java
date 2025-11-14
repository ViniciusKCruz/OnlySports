// LojaService.java
package com.example.onlysports.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class LojaService {

    // Simula o catálogo de produtos de um time
    private static final Map<Long, List<String>> CATALOGO = Map.of(
            1L, List.of("Camisa Oficial Time A", "Cachecol Time A"),
            2L, List.of("Camisa Oficial Time B", "Chaveiro Time B")
    );

    // Simula a busca de produtos de uma API externa (US-009)
    public List<String> buscarProdutosDoTime(Long timeId) {
        return CATALOGO.getOrDefault(timeId, List.of("Nenhum produto disponível."));
    }

    // Simula a criação de um pedido e geração de URL de checkout (Integração)
    public String iniciarProcessoDeCompra(Long usuarioId, String produto) {
        // Lógica real: Chamar API do parceiro, criar pedido e retornar URL.
        return "https://api-parceira.com/checkout?user=" + usuarioId + "&item=" + produto.replace(" ", "");
    }
}