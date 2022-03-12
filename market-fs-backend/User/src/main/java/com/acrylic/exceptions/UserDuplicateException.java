package com.acrylic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class UserDuplicateException extends RuntimeException {

    public UserDuplicateException(String message) {
        super(message);
    }

    public UserDuplicateException(String message, Throwable cause) {
        super(message, cause);
    }
}
