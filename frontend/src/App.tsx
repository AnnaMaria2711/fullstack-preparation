import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./login/Login.tsx";
import Collections from "./collections/Collections.tsx";
import AddStudyset from "./addStudyset/AddStudyset.tsx";
import LearnStudyset from "./learnStudyset/LearnStudyset.tsx";
import Writing from "./writing/Writing.tsx";

import Flashcards from "./flashcard/Flashcards.tsx";
import Register from "./register/Register.tsx";

function App() {

    return (

        <Routes>
            <Route path="/" element={<Navigate to={"/login"}/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/collections" element={<Collections/>}/>
            <Route path="/collections/add-studyset" element={<AddStudyset/>}/>
            <Route path="/collections/learn/:name" element={<LearnStudyset/>}/>
            <Route path="/collections/learn/:name/writing" element={<Writing/>}/>
            <Route path="/collections/learn/:name/flashcards" element={<Flashcards/>}/>
        </Routes>

    )

}

export default App
