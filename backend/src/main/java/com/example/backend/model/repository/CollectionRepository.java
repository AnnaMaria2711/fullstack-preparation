package com.example.backend.model.repository;


import com.example.backend.model.dao.Collection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

}
