// WebSecurityConfig.java
package com.example.onlysports.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.onlysports.dto.LoginResponse;
import com.example.onlysports.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CustomUserDetailsService userDetailsService;

    @Autowired
    public WebSecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Desabilita o CSRF para requisições stateless
                .cors(Customizer.withDefaults())

                // Adiciona o provedor de autenticação customizado
                .authenticationProvider(authenticationProvider())

                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                        .requestMatchers("/api/users/me", "/api/users/preferences").authenticated()
                        .requestMatchers("/api/premium/**").hasRole("PREMIUM")
                        .anyRequest().authenticated()
                )

                // 1. Removemos o httpBasic para focar no Form Login (o que o React Native fará)
                // .httpBasic(Customizer.withDefaults())

                // 2. Configuração Form Login - Essencial para receber dados do frontend
                .formLogin(form -> form
                        .loginProcessingUrl("/api/auth/login")
                        // Usa o nosso Success Handler para retornar o JSESSIONID no body
                        .successHandler((request, response, authentication) -> {
                            String sessionId = request.getSession(false).getId();
                            LoginResponse loginResponse = new LoginResponse("Login efetuado com sucesso.", sessionId);

                            response.setStatus(HttpServletResponse.SC_OK);
                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                            response.getWriter().write(objectMapper.writeValueAsString(loginResponse));
                            response.getWriter().flush();
                        })
                        // Usa um Failure Handler padrão
                        .failureHandler(new SimpleUrlAuthenticationFailureHandler("/api/auth/login?error"))
                )

                // 3. Adiciona um ponto de falha para rotas que precisam de autenticação
                .exceptionHandling(e -> e.authenticationEntryPoint((request, response, authException) ->
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Você precisa estar autenticado para acessar este recurso.")
                ));

        return http.build();
    }
}