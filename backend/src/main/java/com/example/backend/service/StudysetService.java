package com.example.backend.service;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dto.StudysetCreateRequest;
import com.example.backend.model.repository.StudysetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class StudysetService {

    private final StudysetRepository studysetRepository;

    public Set<Studyset> fetchALLStudysets() {
        return studysetRepository.findAllWithUser();
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
