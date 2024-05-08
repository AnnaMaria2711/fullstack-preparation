package com.example.backend.model.repository;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudysetRepository extends JpaRepository<Studyset, Long> {
    List<Studyset> findAllByUser(User user);

    List<Studyset> findAllByNameContaining(String name);
}
