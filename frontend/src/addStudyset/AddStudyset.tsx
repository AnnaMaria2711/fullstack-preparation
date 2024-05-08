import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./AddStudyset.css";

function AddStudyset() {

    const navigate = useNavigate();
    const [word, setWord] = useState<string>("");
    const [solution, setSolution] = useState<string>("");
    const [name, setName] = useState<string>("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!solution || !word || !name) {
            throw new Error("Input fields must be filled");
        }
        if (word && solution !== "") {
            return
        }
        axios.post("/studyset/create" + name + word + solution).then(res => {
            console.log(res);
            navigate("/collections");
        })

    }
    return (
        <>
            <div className={"align-left"}>
                <Link to={"/collections"}>Back</Link>
            </div>
            <h1>Add Studyset</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder={"Studyset name"} value={name} type={"text"} onChange={(e) => {
                    setName(e.target.value);
                }}/>
                <input placeholder={"Enter a word"} value={word} type={"text"} onChange={(e) => {
                    setWord(e.target.value);
                }}/>
                <input placeholder={"Enter the solution"} value={solution} type={"text"} onChange={(e) => {
                    setSolution((e.target.value));
                }}/>

                <button type={"submit"}> Add Studyset</button>
            </form>

        </>
    );
}

export default AddStudyset