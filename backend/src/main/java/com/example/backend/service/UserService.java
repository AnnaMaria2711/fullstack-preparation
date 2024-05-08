package com.example.backend.service;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dao.User;
import com.example.backend.model.dto.StudysetCreateRequest;
import com.example.backend.model.repository.StudysetRepository;
import com.example.backend.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final StudysetRepository studysetRepository;

    public User fetchUsers(String name) {
        Optional<User> userOptional = userRepository.findByName(name);
        if (userOptional.isEmpty()) throw new RuntimeException();
        return userOptional.get();
    }

    public List<Studyset> fetchStudysets(String username) {
        Optional<User> user = userRepository.findByName(username);
        if (user.isEmpty()) throw new RuntimeException();
        return studysetRepository.findAllByUser(user.get());
    }

    public Set<Studyset> addSetToUser(String username, StudysetCreateRequest studysetDto) {
        Optional<User> userOptional = userRepository.findByName(username);
        if (userOptional.isEmpty()) {
            RuntimeException up = new RuntimeException();
            throw up;
        }
        User user = userOptional.get();

        System.out.println("Studyset Name: " + studysetDto.getName());

        Studyset studyset = new Studyset();
        studyset.setName(studysetDto.getName());
        studyset.setUser(new HashSet<>());
        studyset = studysetRepository.save(studyset);

        System.out.println(studyset);

        user.getStudysets().add(studyset);
        System.out.println(user);
        return userRepository.save(user).getStudysets();
    }
}
