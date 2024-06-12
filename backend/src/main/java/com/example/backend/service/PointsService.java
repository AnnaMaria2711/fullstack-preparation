package com.example.backend.service;

import com.example.backend.model.dao.Points;
import com.example.backend.model.dto.PointsDto;
import com.example.backend.model.repository.PointsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PointsService {

    private final PointsRepository pointsRepository;

    public Points savePoints(PointsDto pointsDto) {
        Points points = new Points();
        points.setUserId(pointsDto.getUserId());
        points.setStudysetId(pointsDto.getStudysetId());
        points.setPoints(pointsDto.getPoints());

        return pointsRepository.save(points);
    }
}
