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
    private Long id;
    @Column(unique = true)
    private String username;
    private String password_hash;
    @Column(unique = true)
    private String email;
    private LocalDateTime firstJoined;
    private LocalDate dateOfBirth;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password_hash='" + password_hash + '\'' +
                ", email='" + email + '\'' +
                ", firstJoined=" + firstJoined +
                ", dateOfBirth=" + dateOfBirth +
                '}';
    }
}
