// com.example.onlysports.config.CustomAuthenticationSuccessHandler.java

package com.example.onlysports.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.onlysports.dto.LoginResponse; // Seu novo DTO
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        // 1. Obtém o JSESSIONID da sessão
        String sessionId = request.getSession(false).getId();

        // 2. Cria o objeto de resposta
        LoginResponse loginResponse = new LoginResponse("Login efetuado com sucesso.", sessionId);

        // 3. Define o tipo de conteúdo e o status
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // 4. Escreve a resposta JSON no corpo
        response.getWriter().write(objectMapper.writeValueAsString(loginResponse));
        response.getWriter().flush();
    }
}