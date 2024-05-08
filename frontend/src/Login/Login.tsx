import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.get("/user/" + name).then((res) => {
            console.log(res)
            localStorage.setItem("User", JSON.stringify(res.data));
            navigate("/collections");
        })

    }
    return (
        <>
            <div className={"center-login"}>
                <form onSubmit={handleSubmit}>
                    <input placeholder={"Enter your Username"} value={name} type="text" onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </>
    )
}

export default Login