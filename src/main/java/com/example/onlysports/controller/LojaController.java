// LojaController.java
package com.example.onlysports.controller;

import com.example.onlysports.model.Usuario;
import com.example.onlysports.service.LojaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loja")
public class LojaController {

    @Autowired
    private LojaService lojaService;

    // GET /api/loja/produtos/{timeId}
    @GetMapping("/produtos/{timeId}")
    public ResponseEntity<List<String>> listarProdutos(@PathVariable Long timeId) {
        List<String> produtos = lojaService.buscarProdutosDoTime(timeId);
        return ResponseEntity.ok(produtos);
    }

    // POST /api/loja/comprar (Requer autenticação)
    @PostMapping("/comprar")
    public ResponseEntity<String> comprarProduto(
            @AuthenticationPrincipal Usuario usuarioLogado,
            @RequestParam String produto // Produto a ser comprado
    ) {
        // Inicia o processo de compra usando o ID do usuário logado
        String linkPagamento = lojaService.iniciarProcessoDeCompra(
                usuarioLogado.getIdUsuario(),
                produto
        );

        // Retorna o link para onde o React Native deve redirecionar o usuário
        return ResponseEntity.ok(linkPagamento);
    }
}