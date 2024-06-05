package com.example.backend.controller;


import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dto.StudysetCreateRequest;
import com.example.backend.service.StudysetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/studyset")
public class StudysetController {

    private final StudysetService studysetService;

    @GetMapping
    public List<Studyset> fetchStudyset() {
        return studysetService.fetchALLStudysets();
    }

    @GetMapping("/{name}")
    public Studyset searchStudysets(@PathVariable String name) {
        return studysetService.findStudyset(name);
    }

    @PostMapping("/create")
    public Studyset createStudyset(@RequestBody StudysetCreateRequest request) {
        if (request.getName().isEmpty() || request.getCards().isEmpty()) {
            throw new RuntimeException();
        }
        return studysetService.createStudyset(request);
    }


    @PutMapping("/{id}/update")
    public Studyset updateStudyset(@PathVariable String name, @RequestBody StudysetCreateRequest request) {
        Studyset existingStudyset = studysetService.findStudyset(name);
        existingStudyset.setName(request.getName());
        return studysetService.updateStudyset(existingStudyset);
    }
}
