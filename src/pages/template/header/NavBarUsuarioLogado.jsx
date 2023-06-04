import { Dropdown, Image } from "react-bootstrap";
import { AiOutlineLink } from "react-icons/ai";
import { FaDog } from "react-icons/fa";
import NavLinkToTop from "../../../components/navLinkToTop/NavLinkToTop";

function NavBarUsuarioLogado({ usuarioLogado, logout }) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="btn btn-warning d-flex justify-content-center align-items-center gap-1">
            <FaDog /> Pets
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <NavLinkToTop className="dropdown-item" to="/cadastrar/pet">
              Cadastrar Pet
            </NavLinkToTop>
            <NavLinkToTop className="dropdown-item" to="/meus/pets">
              Meus Pets
            </NavLinkToTop>
            <NavLinkToTop className="dropdown-item" to="/pets/favoritos">
              Meus Pets Favoritos
            </NavLinkToTop>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <NavLinkToTop
          className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
          to="/meus/links"
        >
          <AiOutlineLink /> Link na Bio
        </NavLinkToTop>
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
            {/* <NavLinkToTop className="dropdown-item disabled" to="/usuario/perfil">
              Perfil
            </NavLinkToTop>
            <NavLinkToTop
              className="dropdown-item disabled"
              to="/usuario/editar/perfil"
            >
              Editar perfil
            </NavLinkToTop>
            <NavLinkToTop
              className="dropdown-item disabled"
              to="/usuario/editar/senha"
            >
              Mudar senha
            </NavLinkToTop> */}
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
