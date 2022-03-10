package com.acrylic.controller;

import com.acrylic.response.AppResponseFactory;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.support.SQLErrorCodes;
import org.springframework.jdbc.support.SQLErrorCodesFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.sql.DataSource;
import java.sql.SQLException;

@ControllerAdvice(assignableTypes = UserController.class)
public record UserControllerExceptionHandlers(DataSource dataSource) {

    private SQLErrorCodes getErrorCodes() {
        return SQLErrorCodesFactory.getInstance().getErrorCodes(dataSource);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolationException(final DataIntegrityViolationException ex) {
        final Throwable cause = ex.getMostSpecificCause();
        final AppResponseFactory responseFactory = AppResponseFactory.getInstance();
        if (cause instanceof SQLException) {
            final String state = ((SQLException) cause).getSQLState();
            final SQLErrorCodes errorCodes = getErrorCodes();

            // Check for duplicate error.
            if (ArrayUtils.contains(errorCodes.getDuplicateKeyCodes(), state)) {
                return new ResponseEntity<>(
                        responseFactory.createSimpleResponse("There is already a user with the same username or email."),
                        HttpStatus.UNPROCESSABLE_ENTITY
                );
            }
        }
        return responseFactory.createDefaultErrorResponse();
    }

}
