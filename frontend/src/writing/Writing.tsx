import React, {useEffect, useRef, useState} from "react";
import {StudySet} from "../collections/Collections.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
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
    const isFirstTryRef = useRef<boolean>(true);
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState<string>('');
    const [message, setMessage] = useState<string>("");
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [points, setPoints] = useState(0);
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

    const handleNext = () => {
        if (studyset.cards[index]?.solution === input) {
            if (isFirstTryRef.current) {
                setPoints(prevPoints => prevPoints + 1);
            }
            setMessage("correct");
            setTimeout(() => {
                if (index < studyset.cards.length - 1) {
                    isFirstTryRef.current = true;
                    setMessage("");
                    setInput("");
                    setIndex(prevState => prevState + 1);
                    setIsClicked(false);
                } else {
                    handleFinish();
                }
            }, 1000);
        } else {
            isFirstTryRef.current = false;
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
        handleNext();
    };

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    const handleFinish = () => {
        axios.post(`/api/points`, {points})
            .then((res) => {
                console.log(res.data);
                navigate(`/learn/${studyset.name}`);
            })
            .catch((err) => {
                console.error(err);
            });
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
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <button onClick={handleBack} disabled={index === 0}>Back</button>
                {studyset.cards.length - 1 === index
                    ? <button onClick={handleFinish}>Finish</button>
                    : <button onClick={handleNext} disabled={studyset.cards.length - 1 === index}>Next</button>}
            </div>
            <button onClick={handleClick}>show solution</button>
            {isClicked && <div className="h1">{studyset.cards[index]?.solution}</div>}
            <div className="points">Points: {points}</div>
        </>
    );
}
