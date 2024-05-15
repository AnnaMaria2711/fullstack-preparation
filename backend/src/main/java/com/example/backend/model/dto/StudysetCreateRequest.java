package com.example.backend.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class StudysetCreateRequest {
    private String name;
    private Long ownerId;
    private List<CardDto> cards;
}
