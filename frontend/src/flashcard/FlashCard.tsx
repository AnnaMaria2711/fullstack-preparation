import {useState} from "react";

type FlashCardProps = {
    word: string;
    solution: string;
}

export default function FlashCard({word, solution}: FlashCardProps) {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (<div className="full-container" onClick={handleFlip}>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
            <div className="flashcards-container">
                <div className="front">
                    <div className="h1">{word}</div>
                </div>
                <div className="flashcard-back">
                    <div className="h1">{solution}</div>
                </div>
            </div>
        </div>
    </div>);
}