package com.example.backend.service;

import com.example.backend.model.dao.Collection;
import com.example.backend.model.dto.CollectionCreateRequest;
import com.example.backend.model.repository.CollectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class CollectionService {

    private final CollectionRepository repository;

    public List<Collection> fetchAllCategories() {
        return repository.findAll();
    }

    public Collection createCategory(CollectionCreateRequest request) {
        Collection collection = new Collection();
        collection.setName(request.getName());
        return repository.save(collection);
    }
}
