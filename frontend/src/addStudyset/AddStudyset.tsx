import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./AddStudyset.css";
import CardComponent from "./CardComponent.tsx";
import axios from "axios";
import {Card} from "../types.tsx";


function AddStudyset() {

    const emptyCard: Card = {word: "", solution: ""};
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [cards, setCards] = useState<Card[]>([emptyCard]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(cards);
        if (cards.length === 1 && (cards[0].word === "" || cards[0].solution === "")) {
            console.warn("No completed cards");
        }
        const requestData = {
            name: name,
            ownerId: 1,
            cards: [...cards].splice(0, cards.length - 1)
        }

        console.log(requestData);

        axios.post("/api/studyset/create", requestData)
            .then(() => {
                console.log("Success.");
                navigate("/");
            })
            .catch(() => console.log("Kaputt."))
    }

    const removeAtIndex = (index: number) => {
        const newCards: Card[] = [];
        cards.forEach((c, i) => {
            if (i !== index) newCards.push(c);
        })
        return newCards;
    }

    useEffect(() => {
        let i: number = 0;
        let oneEmpty: boolean = false;
        while (i < cards.length && !oneEmpty) {
            oneEmpty = cards[i].solution == "" || cards[i].word == "";
            i++;
        }
        if (!oneEmpty) {
            setCards(current => [...current, {...emptyCard}])
        }
    }, [cards]);

    const setWord = (index: number, w: string) => {
        setCards(current => {
            return current.map((c, i) => ({
                ...c
                , word: (i === index) ? w : c.word
            }));
        });
    }

    const setSolution = (index: number, s: string) => {
        setCards(current => {
            return current.map((c, i) => ({
                ...c,
                solution: (i === index) ? s : c.solution
            }));
        });
    }

    const deleteCard = (cardIndex: number) => {
        setCards(removeAtIndex(cardIndex));
    }

    return (
        <>
            <div className={"back"}>
                <Link to={"/"}>Back</Link>
            </div>
            <div className={"h1"}>Add Studyset</div>
            <form onSubmit={handleSubmit} autoComplete={"off"}>
                <div className={"form-container"}>
                    <div className={"studyset-name"}>
                        <label htmlFor="name">Name:</label>
                        <input name="name" placeholder={"Studyset name"} value={name} type={"text"}
                               onChange={(e) => {
                                   setName(e.target.value);
                               }}/>
                    </div>
                    {cards.map((card, i) => {
                        return <div key={i}>
                            <CardComponent card={card} setSolution={(s) => {
                                setSolution(i, s);
                            }} setWord={(w) => {
                                setWord(i, w)
                            }} delete={() => {
                                deleteCard(i);
                            }} isLast={i === cards.length - 1}/>
                        </div>
                    })}
                    <div className={"submit-button"}>
                        <button type={"submit"}> Add Studyset</button>
                    </div>
                </div>
            </form>

        </>
    );
}

export default AddStudyset
