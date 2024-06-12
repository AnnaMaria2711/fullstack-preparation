package com.example.backend.model.repository;

import com.example.backend.model.dao.Points;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointsRepository extends JpaRepository<Points, Long> {
}
