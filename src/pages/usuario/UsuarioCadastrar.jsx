import React, { useContext, useState } from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import CarregamentoTela from "../../components/Carregamento";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import TituloPagina from "./../../components/TituloPagina";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthGoogle } from "../../contexts/AuthGoogle";
import { FcGoogle } from "react-icons/fc";
import {
  formataPrimeiroNome,
  formataUltimoNome,
  obterParteAntesDoArroba,
} from "../../utils/Mask";
import { gerarNumeroAleatorio } from "../../utils/Util";
import { LOGIN_EXTERNO_TIPO_GOOGLE } from "../../components/Constantes";

function UsuarioCadastrar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setarMensagem } = useContext(MessageContext);
  const { setarUsuarioLogado } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  function validaCampos() {
    if (email === "" || email === null) {
      setarMensagem("Preencha o campo email", null);
      return false;
    }

    if (senha === "" || senha === null) {
      setarMensagem("Preencha a campo senha", null);
      return false;
    }

    if (senhaRepetida === "" || senhaRepetida === null) {
      setarMensagem("Preencha o campo repetir senha", null);
      return false;
    }

    if (senha !== senhaRepetida) {
      setarMensagem("As senhas estão diferentes", null);
      return false;
    }

    return true;
  }

  function cadastrarUsuario() {
    window.scrollTo(0, 0);

    if (validaCampos()) {
      setIsLoading(true);
      Api.post(
        "users",
        {
          usuario: obterParteAntesDoArroba(email) + gerarNumeroAleatorio(4),
          email: email,
          senha: senha,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then(() => {
          window.scrollTo(0, 0);
          Api.post("login", {
            email: email,
            senha: senha,
          })
            .then(({ data }) => {
              setarUsuarioLogado(data.usuario, data.token, true);
              navigate("/");
            })
            .catch(({ response }) => {
              setarMensagem(response.data.message, null);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
          setIsLoading(false);
        });
    }
  }

  function cadastrarUsuarioGoogle(
    primeiroNome,
    sobrenome,
    email,
    googleId,
    imagem
  ) {
    window.scrollTo(0, 0);

    setIsLoading(true);
    Api.post(
      "users",
      {
        usuario: obterParteAntesDoArroba(email) + gerarNumeroAleatorio(4),
        primeiro_nome: primeiroNome,
        sobrenome: sobrenome,
        email: email,
        senha: gerarNumeroAleatorio(20),
        google_id: googleId,
        imagem_perfil_externo: imagem,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        window.scrollTo(0, 0);
        Api.post("login/externo", {
          email: email,
          login_externo_tipo: LOGIN_EXTERNO_TIPO_GOOGLE,
          google_id: googleId,
        })
          .then(({ data }) => {
            setarUsuarioLogado(data.usuario, data.token, true);
            navigate("/");
          })
          .catch(({ response }) => {
            setarMensagem(response.data.message, null);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
        setIsLoading(false);
      });
  }

  const registroComGoogle = async () => {
    signInWithPopup(AuthGoogle, provider)
      .then((result) => {
        const primeiroNome = formataPrimeiroNome(result.user.displayName);
        const sobrenome = formataUltimoNome(result.user.displayName);
        const email = result.user.email;
        const googleId = result.user.uid;
        const imagem = result.user.photoURL;

        cadastrarUsuarioGoogle(
          primeiroNome,
          sobrenome,
          email,
          googleId,
          imagem
        );
      })
      .catch((error) => {
        setarMensagem("Erro no registro pelo Google " + error.message, null);
      });
  };

  return (
    <div className="mx-auto">
      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <Form className="d-flex justify-content-center align-items-center">
          <div>
            <Row>
              <TituloPagina titulo="Cadastrar Usuário" />
            </Row>

            <Row className="mb-3">
              <Button onClick={registroComGoogle}>
                <FcGoogle /> Cadastrar-se com o Google
              </Button>
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="email">
                  E-mail
                </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Digite seu melhor e-mail"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="senha">
                  Senha
                </Form.Label>
                <Form.Control
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  required
                  onChange={(e) => setSenha(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="senhaRepetida">
                  Repetir senha
                </Form.Label>
                <Form.Control
                  id="senhaRepetida"
                  type="password"
                  placeholder="Repita a senha"
                  value={senhaRepetida}
                  required
                  onChange={(e) => setSenhaRepetida(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button
              variant="primary"
              type="submit"
              onClick={() => cadastrarUsuario()}
            >
              Cadastrar
            </Button>

            <p className="mt-3">
              Já possui uma conta?{" "}
              <NavLinkToTop
                className="nav-link d-inline text-decoration-underline"
                to="/usuario/entrar"
              >
                Entrar
              </NavLinkToTop>
            </p>
          </div>
        </Form>
      )}
    </div>
  );
}

export default UsuarioCadastrar;
