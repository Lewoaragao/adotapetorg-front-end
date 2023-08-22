import { BiLogIn } from "react-icons/bi";
import { FaDog, FaRegAddressBook } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import NavLinkToTop from "../../../components/navLinkToTop/NavLinkToTop";
import {
  TELA_BLOG,
  TELA_CADASTRO_USUARIO,
  TELA_TODOS_PET,
  TELA_USUARIO_ENTRAR,
} from "./../../../components/Constantes";

function NavBarUsuarioNaoLogado() {
  return (
    <>
      <NavLinkToTop
        className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
        to={TELA_TODOS_PET}
      >
        <FaDog /> Pets
      </NavLinkToTop>

      <NavLinkToTop
        className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
        to={TELA_BLOG}
      >
        <IoMdBook /> Blog
      </NavLinkToTop>

      <NavLinkToTop
        className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
        to={TELA_CADASTRO_USUARIO}
      >
        <FaRegAddressBook /> Cadastrar
      </NavLinkToTop>

      <NavLinkToTop
        className="btn btn-warning fw-bold d-flex justify-content-center align-items-center gap-1"
        to={TELA_USUARIO_ENTRAR}
      >
        <BiLogIn /> Entrar
      </NavLinkToTop>
    </>
  );
}

export default NavBarUsuarioNaoLogado;
