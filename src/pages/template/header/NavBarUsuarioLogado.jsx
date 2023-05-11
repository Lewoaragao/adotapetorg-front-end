import { Dropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { FaUserCircle, FaDog } from 'react-icons/fa';

function NavBarUsuarioLogado({ usuarioLogado, logout }) {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <Dropdown>
                    <Dropdown.Toggle className="btn btn-warning d-flex justify-content-center align-items-center gap-1">
                        <FaDog /> Pets
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <NavLink className="dropdown-item" to="/pet/cadastrar">Cadastrar Pet</NavLink>
                        <NavLink className="dropdown-item" to="/pet/meus">Meus Pets</NavLink>
                        <NavLink className="dropdown-item disabled" to="/pet/favoritos">Pets Favoritos</NavLink>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="d-flex justify-content-center align-items-center">
                <Dropdown>
                    <Dropdown.Toggle className="bg-light text-secondary nav nav-link d-flex justify-content-center align-items-center gap-1">
                        <FaUserCircle /> Olá, <span className="fw-bold">{usuarioLogado.nome}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <NavLink className="dropdown-item disabled" to="/usuario/perfil">Perfil</NavLink>
                        <NavLink className="dropdown-item disabled" to="/usuario/editar/perfil">Editar perfil</NavLink>
                        <NavLink className="dropdown-item disabled" to="/usuario/editar/senha">Mudar senha</NavLink>
                        <button className="dropdown-item" onClick={logout}>Sair</button>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    )
}

export default NavBarUsuarioLogado