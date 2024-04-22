package com.example.backend.controller;


import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dto.StudysetCreateRequest;
import com.example.backend.service.StudysetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studyset")
public class StudysetController {

    private final StudysetService studysetService;

    @GetMapping
    public List<Studyset> fetchStudyset() {
        return studysetService.fetchALLStudysets();
    }

    @PostMapping("/create")
    public Studyset createStudyset(@RequestBody StudysetCreateRequest request) {
        studysetService.createStudyset(request);
        return studysetService.createStudyset(request);
    }
}
