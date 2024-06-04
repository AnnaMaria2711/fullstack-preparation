import {Card} from "../types.tsx";

interface CardProps {
    card: Card;
    isLast: boolean;
    setWord: (newWord: string) => void;
    setSolution: (newSolution: string) => void;
    delete: () => void;
}

export default function CardComponent(props: CardProps) {

    return (
        <div className={"studyset-word-solution"}>
            <label htmlFor="word">Word:</label>
            <input name="word" placeholder={"Enter a word"} value={props.card.word} type={"text"}
                   onChange={(e) => {
                       e.preventDefault();
                       props.setWord(e.target.value);
                   }}/>
            <label htmlFor="solution">Solution:</label>
            <input name="solution" placeholder={"Enter the solution"} value={props.card.solution} type={"text"}
                   onChange={(e) => {
                       e.preventDefault();
                       props.setSolution(e.target.value);
                   }}/>
            <button disabled={props.isLast} onClick={(e) => {
                e.preventDefault();
                props.delete();
            }}>Delete
            </button>
        </div>
    )
}
