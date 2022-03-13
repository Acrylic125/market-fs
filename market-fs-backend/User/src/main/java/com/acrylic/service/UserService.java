package com.acrylic.service;

import com.acrylic.db.SQLError;
import com.acrylic.db.SQLStateErrorResolver;
import com.acrylic.entity.User;
import com.acrylic.exceptions.UserDataSizeOutOfBoundsException;
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

    // Exception Handlers
    private Optional<SQLError> extractSQLError(DataIntegrityViolationException ex) {
        final Throwable cause = ex.getMostSpecificCause();
        if (cause instanceof SQLException)
            return sqlResolver().resolve((SQLException) cause);
        return Optional.empty();
    }

    private RuntimeException handleCreateUpdateUserException(DataIntegrityViolationException ex) {
        Optional<SQLError> optionalError = this.extractSQLError(ex);
        return optionalError.map(sqlError -> switch (sqlError) {
            case DUPLICATE -> new UserDuplicateException("User with the same username or email already exists.");
            case DATA_SIZE_OUT_OF_BOUNDS -> new UserDataSizeOutOfBoundsException("User data provided is out of bounds.");
        }).orElse(ex);
    }

    // User Methods
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
            throw handleCreateUpdateUserException(ex);
        }
    }

    public Integer updateUserById(Long id, User user) {
        try {
            return userRepository.updateUserById(id, user.getUsername(), user.getEmail(), user.getDateOfBirth());
        } catch (DataIntegrityViolationException ex) {
            throw handleCreateUpdateUserException(ex);
        }
    }

}
