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

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Integer updateUserById(Long id, User user) {
        return userRepository.updateUserById(id, user.getUsername(), user.getEmail(), user.getDateOfBirth());
    }

}
