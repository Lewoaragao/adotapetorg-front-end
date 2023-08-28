import { Button, Dropdown, Image } from "react-bootstrap";
import { AiOutlineLink } from "react-icons/ai";
import { FaDog } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import {
  TELA_BLOG_TODAS_POSTAGENS,
  TELA_BLOG_POSTAGEM_USUARIO_LOGADO,
  TELA_BLOG_POSTAGEM_USUARIO_LOGADO_FAVORITOS,
  TELA_EDITAR_PERFIL_USUARIO,
  TELA_MEUS_LINKS,
  TELA_PETS_USUARIO_LOGADO,
  TELA_PETS_USUARIO_LOGADO_FAVORITOS,
  TELA_TODOS_PET,
} from "../../../components/Constantes";
import NavLinkToTop from "../../../components/navLinkToTop/NavLinkToTop";

function NavBarUsuarioLogado({ usuarioLogado, logout }) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="bg-light text-secondary nav nav-link d-flex justify-content-center align-items-center gap-1">
            <IoMdBook /> Blog
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <NavLinkToTop
              className="dropdown-item"
              to={TELA_BLOG_TODAS_POSTAGENS}
            >
              Todas as Postagens
            </NavLinkToTop>

            <NavLinkToTop
              className="dropdown-item"
              to={TELA_BLOG_POSTAGEM_USUARIO_LOGADO}
            >
              Minhas Postagens
            </NavLinkToTop>

            <NavLinkToTop
              className="dropdown-item"
              to={TELA_BLOG_POSTAGEM_USUARIO_LOGADO_FAVORITOS}
            >
              Minhas Postagens Favoritas
            </NavLinkToTop>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <Dropdown>
          <Dropdown.Toggle className="btn btn-warning d-flex justify-content-center align-items-center gap-1">
            <FaDog /> Pets
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <NavLinkToTop className="dropdown-item" to={TELA_TODOS_PET}>
              Todos os Pets
            </NavLinkToTop>

            <NavLinkToTop
              className="dropdown-item"
              to={TELA_PETS_USUARIO_LOGADO}
            >
              Meus Pets
            </NavLinkToTop>

            <NavLinkToTop
              className="dropdown-item"
              to={TELA_PETS_USUARIO_LOGADO_FAVORITOS}
            >
              Meus Pets Favoritos
            </NavLinkToTop>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <NavLinkToTop
          className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
          to={TELA_MEUS_LINKS}
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
              src={
                usuarioLogado.imagem.includes("https")
                  ? usuarioLogado.imagem
                  : process.env.REACT_APP_API_URL + usuarioLogado.imagem
              }
              alt={`Foto do usuário ${
                usuarioLogado.is_pessoa
                  ? usuarioLogado.primeiro_nome
                  : usuarioLogado.sigla_organizacao
              }`}
            />
            Olá,{" "}
            <span className="fw-bold">
              {usuarioLogado.is_pessoa
                ? usuarioLogado.primeiro_nome
                : usuarioLogado.sigla_organizacao}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <NavLinkToTop
              className="dropdown-item"
              to={`/usuario/${usuarioLogado.usuario}`}
            >
              Perfil
            </NavLinkToTop>

            <NavLinkToTop
              className="dropdown-item"
              to={TELA_EDITAR_PERFIL_USUARIO}
            >
              Editar perfil
            </NavLinkToTop>

            {/* <Button className="dropdown-item">Mudar senha</Button> */}

            <Button className="dropdown-item" onClick={logout}>
              Sair
            </Button>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default NavBarUsuarioLogado;
