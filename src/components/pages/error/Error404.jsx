import { NavLink } from 'react-router-dom';
import { AiFillAlert } from "react-icons/ai";
import { GiCat } from "react-icons/gi";

function Error404() {
    return (
        <div className="d-flex justify-content-center align-items-center h-75">
            <div>
                <h1 className="fw-bold text-danger d-flex align-items-center gap-3"><AiFillAlert /> 'Error 404'</h1>
                <h2>Ops... essa página não existe</h2>
                <div align="end">
                    <NavLink className="btn btn-secondary mt-2" to="/" title="Voltar para página inicial"><GiCat /> Voltar</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Error404