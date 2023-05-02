import { NavLink } from 'react-router-dom';

function NavBarUsuarioNaoLogado() {
    return (
        <>
            <NavLink className="nav nav-link text-secondary" to="/usuario/cadastrar">Cadastrar</NavLink>
            <NavLink className="nav nav-link text-primary fw-bold" to="/usuario/entrar">Entrar</NavLink>
        </>
    )
}

export default NavBarUsuarioNaoLogado