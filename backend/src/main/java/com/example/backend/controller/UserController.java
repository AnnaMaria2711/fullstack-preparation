package com.example.backend.controller;

import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dao.User;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{name}")
    public User fetchUser(@PathVariable String name) {
        return userService.fetchUser(name);
    }

    @GetMapping("/{name}/studysets")
    public Set<Studyset> fetchStudysets(@PathVariable String name) {
        return userService.fetchStudysets(name);
    }


}
