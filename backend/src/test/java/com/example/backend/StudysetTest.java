package com.example.backend;

import com.example.backend.controller.StudysetController;
import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dto.CardDto;
import com.example.backend.model.dto.StudysetCreateRequest;
import com.example.backend.service.StudysetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StudysetController.class)
class StudysetTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudysetService studysetService;

    @Autowired
    private ObjectMapper objectMapper;

    private Studyset mockStudyset;

    @BeforeEach
    void setUp() {

        mockStudyset = new Studyset();
        mockStudyset.setId(1L);
        mockStudyset.setName("Studyset 1");
    }

    @Test
    void createStudyset_shouldReturnCreatedStudyset_whenRequestIsValid() throws Exception {
        // GIVEN
        CardDto card1 = new CardDto();
        card1.setWord("Word 1");
        card1.setSolution("Solution 1");

        CardDto card2 = new CardDto();
        card2.setWord("Word 2");
        card2.setSolution("Solution 2");

        StudysetCreateRequest request = new StudysetCreateRequest();
        request.setName("Studyset 1");
        request.setOwnerId(1L);
        request.setCards(List.of(card1, card2));

        when(studysetService.createStudyset(any(StudysetCreateRequest.class))).thenReturn(mockStudyset);

        // WHEN & THEN
        mockMvc.perform(post("/api/studyset/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Studyset 1"));
    }


    @Test
    void fetchStudyset_shouldReturnStudysets() throws Exception {
        // GIVEN
        Studyset studyset1 = new Studyset();
        studyset1.setId(1L);
        studyset1.setName("Studyset 1");

        Studyset studyset2 = new Studyset();
        studyset2.setId(2L);
        studyset2.setName("Studyset 2");

        List<Studyset> studysets = List.of(studyset1, studyset2);

        when(studysetService.fetchALLStudysets()).thenReturn(studysets);

        // WHEN & THEN
        mockMvc.perform(get("/api/studyset")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Studyset 1"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].name").value("Studyset 2"));
    }
}
