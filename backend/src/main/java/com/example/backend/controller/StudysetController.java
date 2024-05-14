package com.example.backend.controller;


import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dto.StudysetCreateRequest;
import com.example.backend.service.StudysetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studyset")
public class StudysetController {

    private final StudysetService studysetService;

    @GetMapping
    public Set<Studyset> fetchStudyset() {
        return studysetService.fetchALLStudysets();
    }

    @GetMapping("/{name}")
    public List<Studyset> searchStudysets(@PathVariable String name) {
        return studysetService.findStudyset(name);
    }

    @PostMapping("/create")
    public Studyset createStudyset(@RequestBody StudysetCreateRequest request) {
        studysetService.createStudyset(request);
        return studysetService.createStudyset(request);
    }
}
