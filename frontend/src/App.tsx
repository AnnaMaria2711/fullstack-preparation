import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./Login/Login.tsx";
import Collections from "./collections/Collections.tsx";
import AddStudyset from "./addStudyset/AddStudyset.tsx";
import LearnStudyset from "./learnStudyset/LearnStudyset.tsx";

function App() {

    return (

        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/collections" element={<Collections/>}/>
            <Route path="/add+studyset" element={<AddStudyset/>}/>
            <Route path="/learn/{name}" element={<LearnStudyset/>}/>
        </Routes>

    )

}

export default App
