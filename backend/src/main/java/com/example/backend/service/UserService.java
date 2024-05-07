package com.example.backend.service;

import com.example.backend.model.dao.User;
import com.example.backend.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User fetchUsers(String name) {
        Optional<User> userOptional = userRepository.findByName(name);
        if (userOptional.isEmpty()) throw new RuntimeException();
        return userOptional.get();
    }
}
