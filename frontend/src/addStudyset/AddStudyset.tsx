import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function AddStudyset() {

    const [word, setWord] = useState<string>();
    const [solution, setSolution] = useState<string>();
    const [name, setName] = useState<string>();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (solution || word || word && solution == "") {
            throw new Error("Input fields must be filled");
        }
        if (word && solution !== "") {
            return
        }
        axios.post("/studyset/create" + word + solution).then(res => {
            console.log(res);
        })

    }
    return (
        <>
            <div className={"allight-left"}>
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