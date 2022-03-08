package com.acrylic.service;

import com.acrylic.entity.User;
import com.acrylic.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public record UserService(UserRepository userRepository) {

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

}