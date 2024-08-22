import {Link, useLocation} from "react-router-dom";
import './LearnStudyset.css'

export default function LearnStudyset() {
    const {state} = useLocation();


    return (
        <>

            <div className="back">
                <Link to={"/collections"}>Back</Link>
            </div>
            <div className="margin">
                <div className="h1">{state.name}</div>
            </div>
            <div className="edit-studyset">
                <Link to={"/collections"}></Link>
            </div>
            <div className={"flex-row"}>
                <Link to={`/collections/learn/${state.id}/flashcards`} state={state}>
                    <div className="collection-item">
                        <span>Flashcards</span>
                    </div>
                </Link>
                <Link to={`/collections/learn/${state.id}/writing`} state={state}>
                    <div className="collection-item">
                        <span>Writing</span>
                    </div>
                </Link>
            </div>
        </>
    )
}
