package com.acrylic.controller;

import com.acrylic.entity.User;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.sql.SQLException;

@ControllerAdvice(assignableTypes = UserController.class)
public class UserControllerExceptionHandlers {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        System.out.println(ex.getMostSpecificCause().getClass().getName());
//        if (ex.getMostSpecificCause().getClass().getName().equals("org.postgresql.util.PSQLException") &&
//                ((SQLException) ex.getMostSpecificCause()).getSQLState().equals("23505"))
//            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "There is already a user with the same username or email.");
//
        return new ResponseEntity<>(
                ex.getMostSpecificCause().getClass().getName(),
                HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

}
