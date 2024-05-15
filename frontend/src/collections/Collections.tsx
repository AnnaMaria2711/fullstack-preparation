import './Collections.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Card, Owner} from "../types.tsx";

type StudySet = {
    id: number,
    name: string,
    owner: Owner,
    cards: Card[]
}

function Collections() {

    const navigate = useNavigate();
    const [studySets, setStudySets] = useState<StudySet[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const user = localStorage.getItem("User");
        if (!user) {
            return;
        }

        axios.get("/api/user/Anni/studysets")
            .then((res) => {
                console.log(res.data);
                setStudySets(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchTerm(event.currentTarget.value.toUpperCase());
    }
    const handleClick = (name: string) => {
        navigate(`/learn/${name}`);
    };
    return (
        <div className="page-container">
            <div>
                <input placeholder={"Search for studysets..."} type={"text"} onChange={handleSearch}/>
                <div className={"header"}>Select the collection you wish to study</div>
                <div className={"align-right"}>
                    <Link to={"/add+studyset"}>add studyset</Link>
                </div>
            </div>

            <div className="studyset-list-container">
                {studySets.filter(set => set.name.toUpperCase().includes(searchTerm)).map((studySet) => (
                    <div className="collection-item" onClick={() => handleClick(studySet.name)}>
                        <span>{studySet.name}</span>
                    </div>
                ))}
            </div>
            <div>Bereich 3</div>
        </div>
    )
}

export default Collections