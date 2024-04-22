package com.example.backend.model.repository;

import com.example.backend.model.dao.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
