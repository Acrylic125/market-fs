package com.acrylic.service;

import com.acrylic.entity.User;
import com.acrylic.repository.UserRepository;
import com.acrylic.requests.UserRequestBody;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public record UserService(UserRepository userRepository) {

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    public User postUser(User user) {
        return userRepository.save(user);
    }

}
