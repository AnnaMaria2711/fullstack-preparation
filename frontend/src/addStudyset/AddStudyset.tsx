import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./AddStudyset.css";
import CardComponent from "./CardComponent.tsx";
import axios from "axios";
import {Card} from "../types.tsx";


function AddStudyset() {

    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [cards] = useState<Card[]>([]);
    const [fields, setFields] = useState<number[]>([1]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!fields) {
            throw new Error("Input fields must be filled");
        }
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
        console.log(formData);
        console.log(formData.get("name"))
        console.log(formData.getAll("word"))
        console.log(formData.getAll("solution"))
        const words = formData.getAll("word");
        const solutions = formData.getAll("solution");
        words.filter((word, index) => word !== "" && solutions[index] !== "")
            .map((word, index) => {
                cards.push({
                    word: word.toString(),
                    solution: solutions[index].toString()
                })
            })
        const requestData = {
            name: name,
            ownerId: 1,
            cards: cards
        }

        console.log(requestData);

        axios.post("/api/studyset/create", requestData)
            .then(() => {
                console.log("Success.");
                navigate("/collections");
            })
            .catch(() => console.log("Kaputt."))
    }

    const handleFillComplete = () => {
        console.log("Callback called.");
        setFields(prevField => [...prevField, 1])
    }

    return (
        <>
            <div className={"align-left"}>
                <Link to={"/collections"}>Back</Link>
            </div>
            <div className={"h1"}>Add Studyset</div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className={"studyset-name"}>
                    <label htmlFor="name">Name:</label>
                    <input name="name" placeholder={"Studyset name"} value={name} type={"text"} onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                </div>
                {fields.map((_field, index) => (
                    <CardComponent key={index} callback={handleFillComplete}/>
                ))}
                <div className={"submit-button"}>
                    <button type={"submit"}> Add Studyset</button>
                </div>
            </form>

        </>
    );
}

export default AddStudyset
