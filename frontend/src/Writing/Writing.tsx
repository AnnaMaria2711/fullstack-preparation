import React, {useEffect, useState} from "react";
import {StudySet} from "../collections/Collections.tsx";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function Writing() {
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
    const [input, setInput] = useState<string>('');
    const [message, setMessage] = useState<string>("");
    const [isClicked, setIsClicked] = useState<boolean>(false);

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

    const handleNext = () => {
        if (studyset.cards[index]?.solution === input) {
            setMessage("correct");
            setTimeout(() => {
                setMessage("");
                setInput("");
                setIndex(prevState => prevState + 1);
                setIsClicked(false);
            }, 1000);
        } else {
            setMessage("incorrect");
        }
    };

    const handleBack = () => {
        setIndex(prevState => prevState - 1);
        setMessage("");
        setInput("");
        setIsClicked(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (studyset.cards[index]?.solution === input) {
            setMessage("correct");
            setTimeout(() => {
                setMessage("");
                setInput("");
                setIndex(prevState => prevState + 1);
                setIsClicked(false);
            }, 1000);
        } else {
            setMessage("incorrect");
        }
    };

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <>
            <div className="back">
                <Link to={`/learn/${name}`}>Back</Link>
            </div>
            <div className="h1">{studyset.cards[index]?.word}</div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Enter the solution"
                    value={input}
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                />
            </form>
            {message && <div className="h1">{message}</div>}
            <button onClick={handleNext} disabled={studyset.cards.length - 1 === index}>Next</button>
            <button onClick={handleBack} disabled={index === 0}>Back</button>
            <button onClick={handleClick}>show solution</button>
            {isClicked && <div className="h1">{studyset.cards[index]?.solution}</div>}
        </>
    );
}
