package com.example.onlysports.dto;

import java.util.Set;

public record PreferenciasRequest(
        Set<String> preferencias // Ex: {"Futebol", "Flamengo", "Libertadores"}
) {}