import './Flashcard.css';
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {StudySet} from "../collections/Collections.tsx";
import FlashCard from "./FlashCard.tsx";
import {Card, Owner} from "../types.tsx";

export default function Flashcards() {

    const [studyset, setStudyset] = useState<StudySet>({
        id: 0,
        name: "",
        owner: {
            id: 0,
            name: "",
        },
        cards: [],
    });

    const params = useParams();
    const id: string | undefined = params.name;
    const [index, setIndex] = useState(0);
    const [user] = useState<Owner>(JSON.parse(localStorage.getItem("User") || ""));

    useEffect(() => {
        if (!user) {
            return;
        }

        axios.get(`/api/studyset/${id}`)
            .then((res) => {
                console.log(res.data);
                setStudyset(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, user]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (index < studyset.cards.length - 1) {
            setIndex(prevState => prevState + 1);
        }
    };


    const handleBack = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (index > 0) {
            setIndex(prevState => prevState - 1);
        }
    };

    return (
        <>
            <div className="back">
                <Link to={`/collections/learn/${id}`} state={studyset}>Back</Link>
            </div>

            {studyset.cards.map((card: Card, i: number) => i === index &&
                <FlashCard key={i} word={card.word} solution={card.solution}/>)}


            <div className="button-container">
                <button onClick={handleBack} disabled={index === 0}>Back</button>
                {studyset.cards.length - 1 === index
                    ? <Link to={`/collections/learn/${id}`} state={studyset}>
                        <button>Finish</button>
                    </Link>
                    : <button onClick={handleNext} disabled={studyset.cards.length - 1 === index}>Next</button>}
            </div>
        </>
    );
}
