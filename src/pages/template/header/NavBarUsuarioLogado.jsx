import { Image, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaDog } from "react-icons/fa";

function NavBarUsuarioLogado({ usuarioLogado, logout }) {
  console.log(process.env.REACT_APP_API_URL + usuarioLogado.imagem);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="btn btn-warning d-flex justify-content-center align-items-center gap-1">
            <FaDog /> Pets
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <NavLink className="dropdown-item" to="/pet/cadastrar">
              Cadastrar Pet
            </NavLink>
            <NavLink className="dropdown-item" to="/pet/meus">
              Meus Pets
            </NavLink>
            <NavLink className="dropdown-item" to="/pet/favoritos">
              Meus Pets Favoritos
            </NavLink>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="bg-light text-secondary nav nav-link d-flex justify-content-center align-items-center gap-1">
            <Image
              width="20px"
              roundedCircle
              src={process.env.REACT_APP_API_URL + usuarioLogado.imagem}
              alt={`Foto do usuário ${usuarioLogado.nome}`}
            />
            Olá, <span className="fw-bold">{usuarioLogado.nome}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <NavLink className="dropdown-item disabled" to="/usuario/perfil">
              Perfil
            </NavLink>
            <NavLink
              className="dropdown-item disabled"
              to="/usuario/editar/perfil"
            >
              Editar perfil
            </NavLink>
            <NavLink
              className="dropdown-item disabled"
              to="/usuario/editar/senha"
            >
              Mudar senha
            </NavLink>
            <button className="dropdown-item" onClick={logout}>
              Sair
            </button>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default NavBarUsuarioLogado;
