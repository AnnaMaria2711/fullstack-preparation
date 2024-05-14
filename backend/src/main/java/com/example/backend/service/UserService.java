package com.example.backend.service;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dao.User;
import com.example.backend.model.dto.StudysetCreateRequest;
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
    private final StudysetService studysetService;

    public User fetchUsers(String name) {
        Optional<User> userOptional = userRepository.findByName(name);
        if (userOptional.isEmpty()) throw new RuntimeException();
        return userOptional.get();
    }

    public Set<Studyset> fetchStudysets(String username) {
        Optional<User> user = userRepository.findByName(username);
        if (user.isEmpty()) throw new RuntimeException();
        return studysetRepository.findAllByUser(Set.of(user.get()));
    }

    public Set<Studyset> addSetToUser(String username, StudysetCreateRequest studysetDto) {
        Optional<User> userOptional = userRepository.findByName(username);
        if (userOptional.isEmpty()) throw new RuntimeException("No user with username " + username);
        User user = userOptional.get();

        System.out.println(user);

        Studyset studyset = studysetService.createStudyset(studysetDto);
        user.addStudyset(studyset);
        userRepository.save(user);

        return studysetRepository.findAllByUser(Set.of(user));
    }
}
