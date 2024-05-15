package com.example.backend.model.dao;


import com.example.backend.model.dto.CardDto;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
public class Card {

    private String word;
    private String solution;

    public Card(CardDto cardDto) {
        this.word = cardDto.getWord();
        this.solution = cardDto.getSolution();
    }
}
