import React, {useState} from 'react';
import axios from "axios";

function Login() {

    const [name, setName] = useState<string>('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.get("/user/" + name).then(console.log)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input placeholder={"Enter your Username"} value={name} name="name" type="text" onChange={(e) => {
                    setName(e.target.value);
                }}/>
                <button type="submit">Log in</button>
            </form>
        </>
    )
}

export default Login