package com.example.backend.model.repository;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface StudysetRepository extends JpaRepository<Studyset, Long> {


    Set<Studyset> findAllByOwner(User owner);

    Studyset findByName(String name);
}
