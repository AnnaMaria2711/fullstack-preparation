package com.example.backend.model.repository;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface StudysetRepository extends JpaRepository<Studyset, Long> {


    Set<Studyset> findAllByOwner(User owner);

    Studyset findByName(String name);

    @Query("select studyset from Studyset studyset where studyset.owner.id = :ownerId and studyset.name = :name ")
    List<Studyset> findByNameAndOwnerId(String name, Long ownerId);
}
