package com.example.onlysports.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;

@Data // Gera Getters e Setters automaticamente
@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @ElementCollection(fetch = FetchType.EAGER) // CRÍTICO: Adiciona EAGER para resolver o erro 500
    @CollectionTable(name = "usuario_preferencias", joinColumns = @JoinColumn(name = "usuario_id"))
    @Column(name = "preferencia")
    private Set<String> preferencias; // Ex: {"Futebol", "Flamengo", "Libertadores"}

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoConta tipoConta = TipoConta.PADRAO;

    // --- Implementação UserDetails (Para o Spring Security) ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.tipoConta.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
}