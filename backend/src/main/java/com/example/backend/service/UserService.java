package com.example.backend.service;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dao.User;
import com.example.backend.model.repository.StudysetRepository;
import com.example.backend.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final StudysetRepository studysetRepository;

    public User createUser(String username) {
        User newUser = new User();
        newUser.setName(username);
        return userRepository.save(newUser);
    }

    public User fetchUser(String name) {
        Optional<User> userOptional = userRepository.findByName(name);
        if (userOptional.isEmpty()) throw new RuntimeException();
        return userOptional.get();
    }

    public User findUserById(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) throw new RuntimeException();
        return userOptional.get();
    }

    public Set<Studyset> fetchStudysets(String username) {
        Optional<User> user = userRepository.findByName(username);
        if (user.isEmpty()) throw new RuntimeException();
        return studysetRepository.findAllByOwner(user.get());
    }


    public void updateUser(User user) {
        userRepository.save(user);
    }
}
