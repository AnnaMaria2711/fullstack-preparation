package com.example.backend.model.dto;

import lombok.Data;

@Data
public class PointsDto {

    private Long userId;

    private Long studysetId;

    private int points;
}
