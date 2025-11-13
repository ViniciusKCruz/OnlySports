package com.example.onlysports.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    // 1. Define o Bean para criptografar senhas (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. Define as regras de acesso (URLs)
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desativa CSRF (padrão em APIs REST)

                .authorizeHttpRequests(authorize -> authorize
                        // O Cadastro e Login devem ser acessíveis por qualquer pessoa (permitAll)
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()

                        // Exemplo: Rotas exclusivas para PREMIUM (US-008)
                        .requestMatchers("/api/premium/**").hasRole("PREMIUM")

                        // Qualquer outra rota exige que o usuário esteja autenticado
                        .anyRequest().authenticated()
                )

                // Usamos a autenticação HTTP Basic (usuário/senha no header)
                // ou formLogin para simplificar (usuário/senha no body do POST).
                // O Spring Security irá tratar a validação do login.
                .httpBasic(httpBasic -> httpBasic.init(http))
                .formLogin(form -> form.loginProcessingUrl("/api/auth/login"));

        return http.build();
    }
}