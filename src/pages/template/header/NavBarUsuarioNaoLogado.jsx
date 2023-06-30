import { BiLogIn } from "react-icons/bi";
import { FaRegAddressBook } from "react-icons/fa";
import NavLinkToTop from "../../../components/navLinkToTop/NavLinkToTop";
import { IoMdBook } from "react-icons/io";

function NavBarUsuarioNaoLogado() {
  return (
    <>
      <NavLinkToTop
        className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
        to="/blog"
      >
        <IoMdBook /> Blog
      </NavLinkToTop>
      <NavLinkToTop
        className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
        to="/cadastrar/usuario"
      >
        <FaRegAddressBook /> Cadastrar
      </NavLinkToTop>
      <NavLinkToTop
        className="btn btn-warning fw-bold d-flex justify-content-center align-items-center gap-1"
        to="/usuario/entrar"
      >
        <BiLogIn /> Entrar
      </NavLinkToTop>
    </>
  );
}

export default NavBarUsuarioNaoLogado;
