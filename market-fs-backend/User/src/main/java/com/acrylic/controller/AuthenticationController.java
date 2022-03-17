package com.acrylic.controller;

import com.acrylic.dto.AuthenticationRequest;
import com.acrylic.dto.AuthenticationResponse;
import com.acrylic.dto.User;
import com.acrylic.security.JWTUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/auth")
public record AuthenticationController(AuthenticationManager authenticationManager, JWTUtils jwtUtils) {

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.user(), request.password()));

            Object principal = authenticate.getPrincipal();
            User user = (User) principal;

            return new ResponseEntity<>(new AuthenticationResponse(jwtUtils.createToken(user)), HttpStatus.OK);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
