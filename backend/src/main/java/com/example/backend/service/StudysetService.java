package com.example.backend.service;

import com.example.backend.model.dao.Card;
import com.example.backend.model.dao.Studyset;
import com.example.backend.model.dao.User;
import com.example.backend.model.dto.StudysetCreateRequest;
import com.example.backend.model.repository.StudysetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StudysetService {

    private final StudysetRepository studysetRepository;
    private final UserService userService;

    public List<Studyset> fetchALLStudysets() {
        return studysetRepository.findAll();
    }

    public Studyset createStudyset(StudysetCreateRequest request) {
        User user = userService.findUserById(request.getOwnerId());

        Studyset studyset = new Studyset();
        studyset.setName(request.getName());
        studyset.setOwner(user);
        List<Card> cards = request.getCards().stream().map(Card::new).toList();
        studyset.setCards(cards);
        studyset = studysetRepository.save(studyset);

        return studyset;
    }

    public List<Studyset> findStudyset(String name) {
        return studysetRepository.findAllByNameContaining(name);
    }
}
