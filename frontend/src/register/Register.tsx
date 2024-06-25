import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

type UserCreateRequest = {
    name: string;
}

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("/api/user/create", {name: username} as UserCreateRequest).then(() => {
            navigate("/login");
        })
    }

    return (
        <>
            <div className={"back"}>
                <Link to={"/"}>Back</Link>
            </div>
            <div className={"content-container"}>
                <div className={"h1"}>Register</div>
                <div className={"center-login"}>
                    <form onSubmit={handleSubmit}>
                        <input placeholder={"Enter your Username"} value={username} type="text" onChange={(e) => {
                            setUsername(e.target.value);
                        }}/>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </>);
}