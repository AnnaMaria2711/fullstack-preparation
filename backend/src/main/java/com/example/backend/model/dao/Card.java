package com.example.backend.model.dao;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String word;
    private String solution;

    @ManyToOne
    private Studyset studyset;

}
