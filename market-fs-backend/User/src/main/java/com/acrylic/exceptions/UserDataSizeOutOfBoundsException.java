package com.acrylic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserDataSizeOutOfBoundsException extends RuntimeException {

    public UserDataSizeOutOfBoundsException(String message) {
        super(message);
    }

    public UserDataSizeOutOfBoundsException(String message, Throwable cause) {
        super(message, cause);
    }

}
