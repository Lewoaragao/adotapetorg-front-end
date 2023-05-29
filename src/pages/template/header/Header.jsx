import React, { useContext, useState } from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BiHomeHeart } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Api from "../../../services/Api";
import Mensagem from "./../../../components/mensagem/Mensagem";
import NavBarUsuarioLogado from "./NavBarUsuarioLogado";
import NavBarUsuarioNaoLogado from "./NavBarUsuarioNaoLogado";

function Header({ logo, usuarioLogadoVerificado }) {
  const navigate = useNavigate();
  const { isUsuarioLogado, usuarioLogado, setarUsuarioLogado, token } =
    useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [msgTipo, setMsgTipo] = useState("");

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
        setMsg(response.data.message);
        setMsgTipo("warning");
      });
  }

  return (
    <>
      <Navbar expand="md" sticky="top" bg="light">
        <Container>
          <NavLink to="/">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top rounded"
              alt="logo adota pet org"
            />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="gap-2">
              <NavLink
                className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
                to="/"
              >
                <BiHomeHeart /> Início
              </NavLink>
              <NavLink
                className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1"
                to="/sobre"
              >
                <AiFillQuestionCircle /> Sobre
              </NavLink>

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

      <Mensagem mensagem={msg} mensagemTipo={msgTipo} />
    </>
  );
}

export default Header;
