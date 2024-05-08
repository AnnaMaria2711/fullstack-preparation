package com.example.backend.service;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dto.StudysetCreateRequest;
import com.example.backend.model.repository.StudysetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudysetService {

    private final StudysetRepository studysetRepository;

    public List<Studyset> fetchALLStudysets() {
        return studysetRepository.findAll();
    }


    public Studyset createStudyset(StudysetCreateRequest request) {
        Studyset studyset = new Studyset();
        studyset.setName(request.getName());
        return studysetRepository.save(studyset);
    }

    public List<Studyset> findStudyset(String name) {
        return studysetRepository.findAllByNameContaining(name);
    }
}
