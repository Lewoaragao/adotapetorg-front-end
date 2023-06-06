import { useContext, useState } from "react";
import { InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CarregamentoBotao } from "../../components/Carregamento";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import TituloPagina from "./../../components/TituloPagina";

function UsuarioEntrar() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembreMe, setLembreMe] = useState(false);
  const { setarMensagem } = useContext(MessageContext);
  const { setarUsuarioLogado } = useContext(AuthContext);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  function validaCampos() {
    if (email === "" || email === null) {
      setarMensagem("Preencha o campo email", null);
      return false;
    }

    if (senha === "" || senha === null) {
      setarMensagem("Preencha a campo senha", null);
      return false;
    }

    return true;
  }

  function entrarUsuario(e) {
    e.preventDefault();

    if (validaCampos()) {
      setIsLoadingButton(true);
      Api.post("login", {
        email: email,
        senha: senha,
      })
        .then(({ data }) => {
          lembreMe
            ? localStorage.setItem("token", data.token)
            : localStorage.removeItem("token");
          setarUsuarioLogado(data.usuario, data.token, true);
          navigate("/");
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          setIsLoadingButton(false);
        });
    }
  }

  return (
    <>
      <Form className="container col-md-12 col-lg-6">
        <TituloPagina titulo="Entrar" />

        <Row>
          <InputGroup className="mb-3">
            <InputGroup.Text id="email">
              <HiOutlineMail />
            </InputGroup.Text>
            <Form.Control
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </InputGroup>
        </Row>

        <Row>
          <InputGroup className="mb-3">
            <InputGroup.Text id="senha">
              <RiLockPasswordFill />
            </InputGroup.Text>
            <Form.Control
              id="senha"
              type="password"
              placeholder="Senha"
              value={senha}
              required
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />
          </InputGroup>
        </Row>

        <Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Lembre-me"
              onChange={(e) => {
                setLembreMe(e.target.value);
              }}
            />
          </Form.Group>
        </Row>

        <Button
          className="mb-3"
          variant="primary"
          type="submit"
          onClick={entrarUsuario}
          disabled={isLoadingButton}
        >
          {isLoadingButton ? <CarregamentoBotao variant="light" /> : "Entrar"}
        </Button>

        <p>
          Não possui uma conta?{" "}
          <NavLinkToTop
            className="nav-link d-inline text-decoration-underline"
            to="/cadastrar/usuario"
          >
            Cadastrar
          </NavLinkToTop>
        </p>
      </Form>
    </>
  );
}

export default UsuarioEntrar;
