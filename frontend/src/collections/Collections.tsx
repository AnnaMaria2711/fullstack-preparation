import './Collections.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


function Collections() {
    const navigate = useNavigate();
    const [studysetEntry, setStudysetEntry] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/studyset");
    }

    useEffect(() => {
        const user = localStorage.getItem("User");
        if (!user) {
            return;
        }
        const username = JSON.parse(user).name;
        axios.get("/user/" + username + "/studysets").then((res) => {
            console.log(res)
        });
    });

    return (
        <>

            <div className="padding-top"></div>
            <form onSubmit={handleSubmit}>
                <input placeholder={"Search for studysets..."} value={studysetEntry} type={"text"} onChange={(e) => {
                    setStudysetEntry(e.target.value);
                }}/>
            </form>
            <div className={"header"}>Select the collection you wish to study</div>
            <div className={"align-right"}>
                <Link to={"/add+studyset"}>add studyset</Link>
                <div className="collections"></div>
            </div>
        </>
    )
}

export default Collections