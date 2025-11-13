// Usuario.java
package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data; // Importe Lombok se estiver usando
import java.util.Collection;
import java.util.List;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data // Gera Getters e Setters automaticamente
@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario; // Chave primária do DB

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email; // Usado como login (username)

    @Column(nullable = false)
    private String senha; // Armazenada CRIPTOGRAFADA (nunca em texto simples!) [cite: 42]

    @ElementCollection // Mapeia as preferências do usuário (US-002) [cite: 44]
    private Set<String> preferencias; // Ex: {"Futebol", "Flamengo", "Libertadores"}

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoConta tipoConta = TipoConta.PADRAO; // Define o status Premium [cite: 81]

    // --- Implementação UserDetails (Para o Spring Security) ---

    // O Spring usa este método para saber as permissões do usuário
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Converte o TipoConta (Enum) para um padrão de Role (Ex: ROLE_PREMIUM)
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.tipoConta.name()));
    }

    // O email é o nome de usuário que usamos para fazer login
    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.senha; // Retorna a senha criptografada
    }

    // Simplificando o controle de status do usuário (mantendo sempre ativo)
    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}