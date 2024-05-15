import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./AddStudyset.css";
import CardComponent from "./CardComponent.tsx";


function AddStudyset() {

    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [fields, setFields] = useState<number[]>([1]);

    /* const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

     }*/

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
            <form>
                <div className={"studyset-name"}>
                    <label htmlFor="name">Name:</label>
                    <input placeholder={"Studyset name"} value={name} type={"text"} onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                </div>
                {fields.map((field, index) => (
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


/*

import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./AddStudyset.css";

interface Field {
    word: string;
    solution: string;

    [key: string]: string; // Index signature
}

function AddStudyset() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [fields, setFields] = useState<Field[]>([{id: 1, word: '', solution: ''}]);

    const handleChange = (index: number, key: string, value: string) => {
        const newFields = [...fields];
        newFields[index][key] = value;
        setFields(newFields);
    };

    const handleAddField = () => {
        const newFields = [...fields];
        newFields.push({id: fields.length + 1, word: '', solution: ''});
        setFields(newFields);
    };

    const handleRemoveField = (index: number) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || fields.some(field => !field.word || !field.solution)) {
            throw new Error("All fields must be filled");
        }

        const studysetData = {
            name: name,
            words: fields.map(field => ({word: field.word, solution: field.solution}))
        };

        axios.post("/studyset/create", studysetData).then(res => {
            console.log(res);
            navigate("/collections");
        });
    };

    return (
        <>
            <div className={"align-left"}>
                <Link to={"/collections"}>Back</Link>
            </div>
            <div className={"h1"}>Add Studyset</div>
            <form onSubmit={handleSubmit}>
                <div className={"studyset-name"}>
                    <label htmlFor="name">Name:</label>
                    <input placeholder={"Studyset name"} value={name} type={"text"} onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                </div>
                <div className={"dynamic-form"}>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <label htmlFor={"word"}>Word:</label>
                            <input
                                id={"word"}
                                placeholder={"Enter word"}
                                value={field.word}
                                onChange={(e) => handleChange(index, 'word', e.target.value)}
                            />
                            <label htmlFor={"solution"}>Solution:</label>
                            <input
                                id={`solution-${index}`}
                                placeholder={"Enter solution"}
                                value={field.solution}
                                onChange={(e) => handleChange(index, 'solution', e.target.value)}
                            />
                            <button type="button" onClick={() => handleRemoveField(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddField}>
                        Add Field
                    </button>
                </div>
                <div className={"submit-button"}>
                    <button type={"submit"}>Add Studyset</button>
                </div>
            </form>
        </>
    );
}

export default AddStudyset;

*/
