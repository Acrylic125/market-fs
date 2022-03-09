package com.acrylic.requests;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record UserRequestBody(
        String username,
        String password,
        String email,
        LocalDate dateOfBirth
) { }
