import { useContext, useEffect, useState } from "react";
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
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthGoogle } from "../../contexts/AuthGoogle";

function UsuarioEntrar() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembreMe, setLembreMe] = useState(false);
  const { setarMensagem } = useContext(MessageContext);
  const { setarUsuarioLogado } = useContext(AuthContext);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/");
    }
  }, [navigate]);

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

  function entrarUsuario() {
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

  function entrarUsuarioGoogle(email, googleId) {
    setIsLoadingButton(true);
    Api.post("login", {
      email: email,
      google_id: googleId,
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

  const entrarComGoogle = () =>
    signInWithPopup(AuthGoogle, provider)
      .then((result) => {
        const email = result.user.email;
        const googleId = result.user.uid;
        entrarUsuarioGoogle(email, googleId);
      })
      .catch((error) => {
        setarMensagem("Erro no registro pelo Google " + error.message, null);
      });

  return (
    <>
      <Form className="d-flex justify-content-center align-items-center">
        <div>
          <TituloPagina titulo="Entrar" />

          <Row className="mb-3">
            <Button onClick={entrarComGoogle}>
              <FcGoogle />
              Entrar com o Google
            </Button>
          </Row>

          <Row className="mb-3">
            <InputGroup>
              <InputGroup.Text id="email">
                <HiOutlineMail />
              </InputGroup.Text>
              <Form.Control
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                required
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </InputGroup>
          </Row>

          <Row className="mb-3">
            <InputGroup>
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
        </div>
      </Form>
    </>
  );
}

export default UsuarioEntrar;
