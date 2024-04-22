package com.example.backend.controller;

import com.example.backend.model.dao.Collection;
import com.example.backend.model.dto.CollectionCreateRequest;
import com.example.backend.service.CollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/collection")
public class CollectionController {
    private final CollectionService categoryService;

    @GetMapping
    public List<Collection> fetchCategory() {
        return categoryService.fetchAllCategories();
    }

    @PostMapping("/create")
    public Collection createCollection(@RequestBody CollectionCreateRequest request) {
        return categoryService.createCategory(request);
    }
}
