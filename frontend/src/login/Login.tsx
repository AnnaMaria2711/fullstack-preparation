import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.get("api/user/" + name)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem("User", JSON.stringify(res.data));
                    navigate("/collections");
                }
            })
            .catch(() => {
                setError("User doesn't exist, register first or check if you entered the correct username");
            });
    }

    return (
        <>
            <div className={"content-container"}>
                <div className={"h1"}>Log in</div>
                <div className={"center-login"}>
                    <form onSubmit={handleSubmit}>
                        <input
                            placeholder={"Enter your Username"}
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button type="submit">Log in</button>
                        <p>Don't have an account?</p>
                        <p>Register <Link to={"/register"}>here</Link></p>
                    </form>
                </div>
            </div>
            {error && <p className="error">{error}</p>}
        </>
    )
}

export default Login;
