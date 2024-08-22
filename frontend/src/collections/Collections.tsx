import './Collections.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Card, Owner} from "../types.tsx";

export type StudySet = {
    id: number,
    name: string,
    owner: Owner,
    cards: Card[]
}

function Collections() {

    const navigate = useNavigate();
    const [studySets, setStudySets] = useState<StudySet[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(0);
    const elementsPerPage = 8;

    useEffect(() => {
        const userString = localStorage.getItem("User");
        if (!userString) {
            navigate("/login")
            return;
        }
        const user = JSON.parse(userString);
        console.log(user.name);
        if (!user) {
            return;
        }

        axios.get(`/api/user/${user.name}/studysets`)
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
        setPageIndex(0);
    }

    const handleNext = () => {
        setPageIndex(prevState => prevState + 1);
    }

    const handleBack = () => {
        setPageIndex(prevState => prevState - 1);
    }

    const filteredStudySets = studySets.filter(set => set.name.toUpperCase().includes(searchTerm));

    return (
        <div className="page-container">
            <div>
                <input placeholder={"Search for studysets..."} type={"text"} onChange={handleSearch}/>
                <div className={"header"}>Select the collection you wish to study</div>
                <div className={"align-right"}>
                    <Link to={"/collections/add-studyset"}>add studyset</Link>
                </div>
            </div>
            <div className="studyset-list-container">
                {filteredStudySets.slice(pageIndex * elementsPerPage, (pageIndex + 1) * elementsPerPage).map((studySet, index) => (
                    <Link to={`/collections/learn/${studySet.id}`} state={studySet}>
                        <div key={index} className="collection-item">
                            <span>{studySet.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <div>{pageIndex + 1}</div>
            <button onClick={handleNext}
                    disabled={(pageIndex + 1) * elementsPerPage >= filteredStudySets.length}>Next
            </button>
            <button onClick={handleBack} disabled={pageIndex == 0}>Back</button>
        </div>
    )
}

export default Collections;
