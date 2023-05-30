import { Dropdown, Image } from "react-bootstrap";
import { AiOutlineLink } from "react-icons/ai";
import { FaDog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function NavBarUsuarioLogado({ usuarioLogado, logout }) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="btn btn-warning d-flex justify-content-center align-items-center gap-1">
            <FaDog /> Pets
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <NavLink className="dropdown-item" to="/cadastrar/pet">
              Cadastrar Pet
            </NavLink>
            <NavLink className="dropdown-item" to="/meus/pets">
              Meus Pets
            </NavLink>
            <NavLink className="dropdown-item" to="/meus/pets/favoritos">
              Meus Pets Favoritos
            </NavLink>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <NavLink
          className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
          to="/meus/links"
        >
          <AiOutlineLink /> Link na Bio
        </NavLink>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="bg-light text-secondary nav nav-link d-flex justify-content-center align-items-center gap-1">
            <Image
              width="20px"
              roundedCircle
              src={process.env.REACT_APP_API_URL + usuarioLogado.imagem}
              alt={`Foto do usuário ${usuarioLogado.primeiro_nome}`}
            />
            Olá, <span className="fw-bold">{usuarioLogado.primeiro_nome}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {/* <NavLink className="dropdown-item disabled" to="/usuario/perfil">
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
            </NavLink> */}
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
