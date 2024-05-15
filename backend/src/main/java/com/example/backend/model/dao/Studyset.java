package com.example.backend.model.dao;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Studyset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    private User owner;

    @ElementCollection
    private List<Card> cards = List.of();

    @ElementCollection
    private List<Long> observerIds = List.of();
}
