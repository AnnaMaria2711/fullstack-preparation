package com.example.backend.controller;

import com.example.backend.model.dao.Points;
import com.example.backend.model.dto.PointsDto;
import com.example.backend.service.PointsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/points")
public class PointsController {

    private final PointsService pointsService;

    @PostMapping
    public Points savePoints(@RequestBody PointsDto pointsDto) {
        return pointsService.savePoints(pointsDto);
    }


}
