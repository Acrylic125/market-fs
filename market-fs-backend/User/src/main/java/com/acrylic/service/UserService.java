package com.acrylic.service;

import com.acrylic.db.SQLError;
import com.acrylic.db.SQLStateErrorResolver;
import com.acrylic.entity.User;
import com.acrylic.exceptions.UserDuplicateException;
import com.acrylic.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
public record UserService(UserRepository userRepository) {

    private SQLStateErrorResolver<SQLException> sqlResolver() {
        return SQLStateErrorResolver.postgres();
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    public User createUser(User user) {
        try {
            return userRepository.save(user);
        } catch (DataIntegrityViolationException ex) {
            final Throwable cause = ex.getMostSpecificCause();
            System.out.println("Test 1");
            if (cause instanceof SQLException) {
                Optional<SQLError> optionalError = sqlResolver().resolve((SQLException) cause);
                System.out.println("Test 2 " + optionalError + " " + ((SQLException) cause).getSQLState());
                if (optionalError.isPresent()) {
                    if (optionalError.get() == SQLError.DUPLICATE) {
                        System.out.println("TTTTT");
                        throw new UserDuplicateException("User with the same username or email already exists.");
                    }
                }
            }
            throw ex;
        }
    }

    public Integer updateUserById(Long id, User user) {
        try {
            return userRepository.updateUserById(id, user.getUsername(), user.getEmail(), user.getDateOfBirth());
        } catch (Throwable ex) {
            System.out.println(ex.getClass());
            throw ex;
        }
    }

}
