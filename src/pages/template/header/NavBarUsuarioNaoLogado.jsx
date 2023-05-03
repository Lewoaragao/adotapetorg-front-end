import { BiLogIn } from 'react-icons/bi';
import { FaRegAddressBook } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function NavBarUsuarioNaoLogado() {
    return (
        <>
            <NavLink className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1" to="/usuario/cadastrar"><FaRegAddressBook /> Cadastrar</NavLink>
            <NavLink className="btn btn-warning fw-bold d-flex justify-content-center align-items-center gap-1" to="/usuario/entrar"><BiLogIn /> Entrar</NavLink>
        </>
    )
}

export default NavBarUsuarioNaoLogado