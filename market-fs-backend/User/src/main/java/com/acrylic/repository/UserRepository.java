package com.acrylic.repository;

import com.acrylic.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface UserRepository
    extends JpaRepository<User, Long>, UserRepositoryDynamic {

    @Query("SELECT u FROM User u WHERE u.username = :username")
    Optional<User> findUserByUsername(@Param("username") String username);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.username = :username, u.email = :email, u.dateOfBirth = :dateOfBirth WHERE u.id = :id")
    Integer updateUserById(@Param("id") Long id,
                                  @Param("username") String username,
                                  @Param("email") String email,
                                  @Param("dateOfBirth") LocalDate dateOfBirth
                                  );

}
