package com.example.backend.service;

import com.example.backend.model.dao.User;
import com.example.backend.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User fetchUsers(String name) {
        return userRepository.findByName(name);
    }
}
