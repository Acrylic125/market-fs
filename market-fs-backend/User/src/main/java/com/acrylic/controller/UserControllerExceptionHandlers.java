package com.acrylic.controller;

import com.acrylic.db.SQLError;
import com.acrylic.db.SQLStateErrorResolver;
import com.acrylic.response.AppResponseFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Optional;

//@ControllerAdvice(assignableTypes = UserController.class)
public record UserControllerExceptionHandlers(DataSource dataSource) {

    public SQLStateErrorResolver<SQLException> sqlResolver() {
        return SQLStateErrorResolver.postgres();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolationException(final DataIntegrityViolationException ex) {
        final Throwable cause = ex.getMostSpecificCause();
        System.out.println(ex.getClass());
        if (cause instanceof SQLException) {
            Optional<SQLError> optionalError = sqlResolver().resolve((SQLException) cause);
            if (optionalError.isPresent()) {
                return switch (optionalError.get()) {
                    case DUPLICATE -> handleDuplicateUserError();
                    case DATA_SIZE_OUT_OF_BOUNDS -> handleDataSizeOutOfBoundsError();
                };
            }
        }

        return AppResponseFactory.getInstance().createDefaultErrorResponse();
    }

    public ResponseEntity<Object> handleDuplicateUserError() {
        return new ResponseEntity<>(
                AppResponseFactory.getInstance().createSimpleResponse("There is already a user with the same username or email."),
                HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

    public ResponseEntity<Object> handleDataSizeOutOfBoundsError() {
        return new ResponseEntity<>(
                AppResponseFactory.getInstance().createSimpleResponse("Some values in the body is out of bounds."),
                HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

}
