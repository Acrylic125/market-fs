package com.acrylic.response;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AppResponseFactory {

    private final static AppResponseFactory appResponseFactory = new AppResponseFactory();

    public static AppResponseFactory getInstance() {
        return appResponseFactory;
    }

    private record SimpleResponse<T>(T message) {}

    public ResponseEntity<Object> createDefaultErrorResponse() {
        return new ResponseEntity<>(createSimpleResponse("Unknown Error!"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public <T> SimpleResponse<T> createSimpleResponse(T message) {
        return new SimpleResponse<>(message);
    }

    public void prettyPrintError(DataIntegrityViolationException ex) {
    }

}
