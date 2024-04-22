package com.example.backend.model.dto;

import com.example.backend.model.dao.Studyset;
import lombok.Data;

@Data
public class CardCreateRequest {
    private String word;
    private String solution;
    private Studyset studyset;
}
