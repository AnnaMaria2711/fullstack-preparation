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


    Set<Studyset> findAllByUser(Set<User> user);

    @Query("SELECT DISTINCT s FROM Studyset s LEFT JOIN FETCH s.user")
    Set<Studyset> findAllWithUser();

    List<Studyset> findAllByNameContaining(String name);
}
