import {Link, useNavigate, useParams} from "react-router-dom";
import './LearnStudyset.css'

export default function LearnStudyset() {
    const params = useParams();
    const name: string | undefined = params.name;
    const navigate = useNavigate();


    return (
        <>
            <div className="back">
                <Link to={"/"}>Back</Link>
            </div>
            <div className="h1">{name}</div>
            <div className="edit-studyset">
                <Link to={"/"}></Link>
            </div>
            <div className={"flex-row"}>
                <div className="collection-item" onClick={() => navigate(`/learn/${name}/flashcards`)}>
                    <span>Flashcards</span>
                </div>
                <div className="collection-item" onClick={() => navigate(`/learn/${name}/writing`)}>
                    <span>Writing</span>
                </div>
            </div>
        </>
    )
}
