import './App.css'
import {Route, Routes} from "react-router-dom";
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
            <Route path="/" element={<Collections/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/add-studyset" element={<AddStudyset/>}/>
            <Route path="/learn/:name" element={<LearnStudyset/>}/>
            <Route path="/learn/:name/writing" element={<Writing/>}/>
            <Route path="/learn/:name/flashcards" element={<Flashcards/>}/>
        </Routes>

    )

}

export default App
