import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiFillGoogleCircle } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CarregamentoTela, {
  CarregamentoBotao,
} from "../../components/Carregamento";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { AuthGoogle } from "../../contexts/AuthGoogle";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { formataPrimeiroNome, formataUltimoNome } from "../../utils/Mask";
import {
  gerarNumeroAleatorio,
  obterParteAntesDoArroba,
} from "../../utils/Util";
import TituloPagina from "./../../components/TituloPagina";

function UsuarioCadastrar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
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

  function cadastrarUsuario(e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    if (validaCampos()) {
      setIsLoadingButton(true);
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
              setIsLoadingButton(false);
            });
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          setIsLoadingButton(false);
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
          <div style={{ maxWidth: "350px" }}>
            <TituloPagina titulo="Cadastrar Usuário" />

            <Form.Label className="text-muted mb-3">
              Ao cadastrar-se você aceita o nosso termo de <br />
              <NavLinkToTop
                className="text-reset text-underline-hover"
                to="/politica/privacidade"
              >
                Politica de Privacidade.
              </NavLinkToTop>
            </Form.Label>

            <Button
              variant="outline-primary"
              onClick={registroComGoogle}
              className="d-flex justify-content-center align-items-center gap-1 mb-3 mx-auto w-100"
            >
              <AiFillGoogleCircle />
              Cadastrar-se com o Google
            </Button>

            {/* <Button
              variant="outline-primary"
              // onClick={registroComFacebook}
              className="d-flex justify-content-center align-items-center gap-1 mb-3 mx-auto w-100"
            >
              <BiLogoFacebookCircle />
              Cadastrar-se com o Facebook
            </Button> */}

            <InputGroup className="mb-3">
              <InputGroup.Text id="email">
                <HiOutlineMail />
              </InputGroup.Text>
              <Form.Control
                id="email"
                type="email"
                placeholder="Digite seu melhor e-mail"
                value={email}
                required
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="senha">
                <RiLockPasswordFill />
              </InputGroup.Text>
              <Form.Control
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                required
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="off"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="senhaRepetida">
                <RiLockPasswordFill />²
              </InputGroup.Text>
              <Form.Control
                id="senhaRepetida"
                type="password"
                placeholder="Repita a senha"
                value={senhaRepetida}
                required
                onChange={(e) => setSenhaRepetida(e.target.value)}
                autoComplete="off"
              />
            </InputGroup>

            <Button
              className="mb-3"
              variant="primary"
              type="submit"
              onClick={(e) => cadastrarUsuario(e)}
              disabled={isLoadingButton}
            >
              {isLoadingButton ? (
                <CarregamentoBotao variant="light" />
              ) : (
                "Cadastrar"
              )}
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
