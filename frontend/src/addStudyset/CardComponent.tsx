import React, {useState} from "react";

interface CardProps {
    callback: () => void;
}

export default function CardComponent(props: CardProps) {
    const [word, setWord] = useState<string>("");
    const [solution, setSolution] = useState<string>("");
    const [children] = useState<number[]>([1]);

    const handleChangeWord = (e: React.FormEvent<HTMLInputElement>) => {
        const newWord = e.currentTarget.value;
        setWord(newWord);
        if ((newWord.length === 1 && solution.length >= 1) && children.length > 0) {
            children.pop();
            props.callback();
        }
    }

    const handleChangeSolution = (e: React.FormEvent<HTMLInputElement>) => {
        const newSolution = e.currentTarget.value;
        setSolution(newSolution);
        if ((newSolution.length === 1 && word.length >= 1) && children.length > 0) {
            children.pop();
            props.callback();
        }
    }

    return (
        <div className={"studyset-word-solution"}>
            <label htmlFor="word">Word:</label>
            <input name="word" placeholder={"Enter a word"} value={word} type={"text"}
                   onChange={(event) => handleChangeWord(event)}/>
            <label htmlFor="solution">Solution:</label>
            <input name="solution" placeholder={"Enter the solution"} value={solution}
                   type={"text"} onChange={(event) => handleChangeSolution(event)}/>
        </div>
    )
}
