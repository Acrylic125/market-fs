package com.acrylic.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Indexed;

import javax.management.relation.Role;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @SequenceGenerator(
            name = "user_id_sequence",
            sequenceName = "user_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_id_sequence"
    )
    @Column(name = "user_id",
            nullable = false)
    private Long id;
    @Column(name = "username",
            unique = true,
            length = 32,
            nullable = false)
    private String username;
    @Column(name = "password_hash",
            nullable = false)
    private String passwordHash;
    @Column(name = "email",
            unique = true,
            nullable = false)
    private String email;
    @Column(name = "first_joined",
            nullable = false)
    private LocalDateTime firstJoined;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    @Column(name = "enabled")
    private boolean enabled = true;
    @Transient
    private Set<? extends GrantedAuthority> authorities = new HashSet<>();

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password_hash='" + passwordHash + '\'' +
                ", email='" + email + '\'' +
                ", firstJoined=" + firstJoined +
                ", dateOfBirth=" + dateOfBirth +
                '}';
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    @Override
    public boolean isAccountNonExpired() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
