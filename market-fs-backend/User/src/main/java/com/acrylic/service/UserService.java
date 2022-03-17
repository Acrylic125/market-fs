package com.acrylic.service;

import com.acrylic.db.SQLError;
import com.acrylic.db.SQLStateErrorResolver;
import com.acrylic.dto.User;
import com.acrylic.exceptions.UserDataSizeOutOfBoundsException;
import com.acrylic.exceptions.UserDuplicateException;
import com.acrylic.exceptions.UserNotFoundException;
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
        return (cause instanceof SQLException) ?
                sqlResolver().resolve((SQLException) cause) :
                Optional.empty();
    }

    private RuntimeException handleCreateUpdateUserException(DataIntegrityViolationException ex) {
        Optional<SQLError> optionalError = this.extractSQLError(ex);
        return optionalError.map(sqlError -> switch (sqlError) {
            case DUPLICATE -> new UserDuplicateException("User with the same username or email already exists.");
            case DATA_SIZE_OUT_OF_BOUNDS -> new UserDataSizeOutOfBoundsException("User data provided is out of bounds.");
        }).orElse(ex);
    }

    // User Methods
    public User findUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty())
            throw new UserNotFoundException("User with the id '%s' does not exist.".formatted(id));
        return userOptional.get();
    }

    public User findUserByUsername(String username) {
        Optional<User> userOptional = userRepository.findUserByUsername(username);
        if (userOptional.isEmpty())
            throw new UserNotFoundException("User with the username '%s' does not exist.".formatted(username));
        return userOptional.get();
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
