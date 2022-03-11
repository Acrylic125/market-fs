package com.acrylic.controller;

import com.acrylic.entity.User;
import com.acrylic.requests.UserRequestBody;
import com.acrylic.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/users")
public record UserController(UserService userService) {

    @GetMapping("id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userService.findUserById(id);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find user with id, '" + id + "'.");
        }
        return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
    }

    @GetMapping("username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> userOptional = userService.findUserByUsername(username);
        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find user with username, '" + username + "'.");
        }
        return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
    }

    @PostMapping("new")
    public ResponseEntity<Long> postUser(@RequestBody UserRequestBody requestBody) {
        User user = User.builder()
                .username(requestBody.username())
                .passwordHash(requestBody.password())
                .email(requestBody.email())
                .dateOfBirth(requestBody.dateOfBirth())
                .firstJoined(LocalDateTime.now())
                .build();
        User posted = userService.createUser(user);
        return new ResponseEntity<>(posted.getId(), HttpStatus.OK);
    }

    @PutMapping("id/{id}")
    public ResponseEntity<Integer> putUser(@PathVariable Long id, @RequestBody UserRequestBody requestBody) {
        User user = User.builder()
                .username(requestBody.username())
                .email(requestBody.email())
                .dateOfBirth(requestBody.dateOfBirth())
                .build();
        Integer records = userService.updateUserById(id, user);
        return new ResponseEntity<>(records, HttpStatus.OK);
    }

}
