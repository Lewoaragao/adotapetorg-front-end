import { Dropdown } from "react-bootstrap"

function NavBarUsuarioLogado({ usuarioLogado, logout }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="warning" className="fw-bold">
                Olá, {usuarioLogado.nome}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/usuario/perfil">Perfil</Dropdown.Item>
                <button className="dropdown-item" onClick={logout}>Sair</button>
            </Dropdown.Menu>
        </Dropdown>
        // <button className="btn btn-warning fw-bold">Olá, {usuarioLogado.nome}</button>
        // <button className="nav nav-link text-secondary" onClick={logout}>Sair</button>
    )
}

export default NavBarUsuarioLogado