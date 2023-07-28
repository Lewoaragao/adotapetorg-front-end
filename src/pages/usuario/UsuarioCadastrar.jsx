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

function UsuarioCadastrar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [imagem, setImagem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setarMensagem } = useContext(MessageContext);
  const { setarUsuarioLogado } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  function validaCampos() {
    if (usuario === "" || usuario === null) {
      setarMensagem("Preencha o campo usuário", null);
      return false;
    }

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

  function cadastrarUsuario(e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    if (validaCampos()) {
      setIsLoading(true);
      Api.post(
        "users",
        {
          usuario: usuario,
          primeiro_nome: primeiroNome === "" ? null : primeiroNome,
          sobrenome: sobrenome === "" ? null : sobrenome,
          email: email,
          senha: senha,
          imagem: imagem,
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

  const signInGoogle = () =>
    signInWithPopup(AuthGoogle, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        console.log(credential);
        console.log(token);
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

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
              <Button onClick={signInGoogle}>
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

            <Button variant="primary" type="submit" onClick={cadastrarUsuario}>
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
