package com.example.backend;

import com.example.backend.controller.UserController;
import com.example.backend.model.dao.Studyset;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Set;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private Set<Studyset> mockStudysets;

    @BeforeEach
    void setUp() {
        Studyset studyset1 = new Studyset();
        studyset1.setId(1L);
        studyset1.setName("Studyset 1");

        Studyset studyset2 = new Studyset();
        studyset2.setId(2L);
        studyset2.setName("Studyset 2");

        mockStudysets = Set.of(studyset1, studyset2);
    }

    @Test
    void fetchStudysets_shouldReturnStudysets_whenUserExists() throws Exception {
        // GIVEN
        String userName = "testuser";
        when(userService.fetchStudysets(anyString())).thenReturn(mockStudysets);

        // WHEN & THEN
        mockMvc.perform(get("/api/user/{name}/studysets", userName))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Studyset 1"))
                .andExpect(jsonPath("$[1].name").value("Studyset 2"));
    }
}