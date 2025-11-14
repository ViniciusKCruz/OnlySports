package com.example.onlysports.service;

import com.example.onlysports.model.Jogo;
import com.example.onlysports.repository.JogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.example.onlysports.model.StatusJogo;
import jakarta.persistence.EntityNotFoundException;


@Service
public class JogoService {

    @Autowired
    private JogoRepository jogoRepository;

    public List<Jogo> buscarJogosAoVivo() {
        // Retorna todos os jogos que estão AO_VIVO
        return jogoRepository.findByStatus(StatusJogo.AO_VIVO);
    }

    public Jogo atualizarPlacarEStatus(Long jogoId, int placarCasa, int placarVisitante) {
        // Busca e atualiza o placar e o status do jogo.
        Jogo jogo = jogoRepository.findById(jogoId)
                .orElseThrow(() -> new EntityNotFoundException("Jogo não encontrado."));

        jogo.setPlacarCasa(placarCasa);
        jogo.setPlacarVisitante(placarVisitante);

        // Simulação: Se o placar for alterado, o status deve ser AO_VIVO
        if (jogo.getStatus() == StatusJogo.AGENDADO) {
            jogo.setStatus(StatusJogo.AO_VIVO);
        }

        return jogoRepository.save(jogo);
    }
}
