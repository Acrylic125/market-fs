package com.acrylic.controller;

import com.acrylic.response.AppResponseFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerHandler {

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<Object> handleThrowable(Throwable throwable) {
        throwable.printStackTrace();
        return AppResponseFactory.getInstance().createDefaultErrorResponse();
    }

}
