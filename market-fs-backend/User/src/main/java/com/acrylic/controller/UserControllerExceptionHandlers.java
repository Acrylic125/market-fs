package com.acrylic.controller;

import com.acrylic.entity.User;
import com.acrylic.response.AppResponseFactory;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.support.SQLErrorCodes;
import org.springframework.jdbc.support.SQLErrorCodesFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Arrays;

@ControllerAdvice(assignableTypes = UserController.class)
public record UserControllerExceptionHandlers(DataSource dataSource) {

    private SQLErrorCodes getErrorCodes() {
        return SQLErrorCodesFactory.getInstance().getErrorCodes(dataSource);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        ArrayUtils.contains(getErrorCodes().getDuplicateKeyCodes(), 3);

        AppResponseFactory.getInstance().createDefaultErrorResponse();

//        if (ex.getMostSpecificCause().getClass().getName().equals("org.postgresql.util.PSQLException") &&
//                ((SQLException) ex.getMostSpecificCause()).getSQLState().equals("23505"))
//            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "There is already a user with the same username or email.");
        return new ResponseEntity<>(
                ex.getMostSpecificCause().getClass().getName(),
                HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

}
