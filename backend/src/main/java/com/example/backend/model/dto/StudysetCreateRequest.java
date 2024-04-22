package com.example.backend.model.dto;

import com.example.backend.model.dao.User;
import lombok.Data;

import java.util.Set;

@Data
public class StudysetCreateRequest {
    private String name;
    private Set<User> user;

}
