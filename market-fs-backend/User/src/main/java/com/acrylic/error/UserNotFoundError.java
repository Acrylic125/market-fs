package com.acrylic.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserNotFoundError
    extends ResponseStatusException {

    public UserNotFoundError(HttpStatus status, String reason) {
        super(status, reason);
    }
}
