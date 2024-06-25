package com.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequiredArgsConstructor
public class BackupController {


    @GetMapping("/{path:^(?!api$).*}/**")
    public String redirectFromHome() {
        return "forward:/index.html";
    }
}