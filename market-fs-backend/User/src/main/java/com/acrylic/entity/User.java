package com.acrylic.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class User {

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
}
