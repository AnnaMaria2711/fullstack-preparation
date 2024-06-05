import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.get("api/user/" + name).then((res) => {
            console.log(res)
            localStorage.setItem("User", JSON.stringify(res.data));
            navigate("/");
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
                    <p>Register <Link to={"/register"}>here</Link></p>
                </form>
            </div>
        </>
    )
}

export default Login