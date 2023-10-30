import { useContext } from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BiHomeHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { TELA_INICIAL, TELA_SOBRE } from "../../../components/Constantes";
import NavLinkToTop from "../../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../../contexts/AuthContext";
import { MessageContext } from "../../../contexts/MessageContext";
import Api from "../../../services/Api";
import NavBarUsuarioLogado from "./NavBarUsuarioLogado";
import NavBarUsuarioNaoLogado from "./NavBarUsuarioNaoLogado";

function Header({ logo }) {
  const navigate = useNavigate();
  const { isUsuarioLogado, usuarioLogado, setarUsuarioLogado, token } =
    useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);

  function logout() {
    Api.get("logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        localStorage.removeItem("token");
        setarUsuarioLogado({}, null, false);
        navigate("/");
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      });
  }

  return (
    <>
      <Navbar expand="md" sticky="top" bg="light">
        <Container>
          <NavLinkToTop to="/">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top rounded"
              alt="logo adota pet org"
            />
          </NavLinkToTop>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav className="gap-2">
              <NavLinkToTop
                className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
                to={TELA_INICIAL}
              >
                <BiHomeHeart /> Início
              </NavLinkToTop>

              <NavLinkToTop
                className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
                to={TELA_SOBRE}
              >
                <AiFillQuestionCircle /> Sobre
              </NavLinkToTop>

              {isUsuarioLogado ? (
                <NavBarUsuarioLogado
                  usuarioLogado={usuarioLogado}
                  logout={logout}
                />
              ) : (
                <NavBarUsuarioNaoLogado />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
