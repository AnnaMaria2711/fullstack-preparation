package com.example.backend.model.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "owner")
    private Set<Studyset> studysets = Set.of();

    public void addStudyset(Studyset s) {
        studysets.add(s);
    }


}
