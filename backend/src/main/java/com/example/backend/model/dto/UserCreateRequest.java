package com.example.backend.model.dto;

import com.example.backend.model.dao.Studyset;
import lombok.Data;

import java.util.Set;


@Data
public class UserCreateRequest {

    private String name;
    private Set<Studyset> studysetSet;
}
