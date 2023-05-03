import { NavLink } from 'react-router-dom';

function NavBarUsuarioNaoLogado() {
    return (
        <>
            <NavLink className="nav nav-link text-secondary" to="/usuario/cadastrar">Cadastrar</NavLink>
            <NavLink className="btn btn-warning fw-bold" to="/usuario/entrar">Entrar</NavLink>
        </>
    )
}

export default NavBarUsuarioNaoLogado