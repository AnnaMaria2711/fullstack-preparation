import './Flashcard.css';
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {StudySet} from "../collections/Collections.tsx";
import FlashCard from "./FlashCard.tsx";
import {Card} from "../types.tsx";

export default function Flashcards() {

    const [studyset, setStudyset] = useState<StudySet>({
        cards: [],
        id: 0,
        name: "",
        owner: {
            id: 0,
            name: ""
        }
    });

    const params = useParams();
    const name: string | undefined = params.name;
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("User");
        if (!user) {
            return;
        }

        axios.get(`/api/studyset/${name}`)
            .then((res) => {
                console.log(res.data);
                setStudyset(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [name]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (index < studyset.cards.length - 1) {
            setIndex(prevState => prevState + 1);
        }
    };

    const handleFinish = () => {
        navigate(`/learn/${studyset.name}`);
    }

    const handleBack = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (index > 0) {
            setIndex(prevState => prevState - 1);
        }
    };

    return (
        <>
            <div className="back">
                <Link to={`/learn/${name}`}>Back</Link>
            </div>

            {studyset.cards.map((card: Card, i: number) => i === index &&
                <FlashCard key={i} word={card.word} solution={card.solution}/>)}


            <div className="button-container">
                <button onClick={handleBack} disabled={index === 0}>Back</button>
                {studyset.cards.length - 1 === index
                    ? <button onClick={handleFinish}>Finish</button>
                    : <button onClick={handleNext} disabled={studyset.cards.length - 1 === index}>Next</button>}
            </div>
        </>
    );
}
