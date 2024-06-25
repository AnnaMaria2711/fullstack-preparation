package com.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BackupController {


    @GetMapping("/{path:^(?!api$).*}/**")
    public String redirectFromHome() {
        return "forward:/index.html";
    }
}