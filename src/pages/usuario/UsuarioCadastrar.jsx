import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import CarregamentoTela from "../../components/Carregamento";
import { FALSE_PHP, TRUE_PHP } from "../../components/Constantes";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import TituloPagina from "./../../components/TituloPagina";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

function UsuarioCadastrar() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [siglaOrganizacao, setSiglaOrganizacao] = useState("");
  const [nomeOrganizacao, setNomeOrganizacao] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [imagem, setImagem] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoEstado, setEnderecoEstado] = useState("");
  const [enderecoPais, setEnderecoPais] = useState("");
  const [telefone, setTelefone] = useState("");
  const [flgTelefoneWhatsapp, setFlgTelefoneWhatsapp] = useState(false);
  const [celular, setCelular] = useState("");
  const [flgCelularWhatsapp, setFlgCelularWhatsapp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPessoa, setIsPessoa] = useState(true);
  const { setarMensagem } = useContext(MessageContext);
  const { setarUsuarioLogado } = useContext(AuthContext);

  function validaCampos() {
    if (usuario === "" || usuario === null) {
      setarMensagem("Preencha o campo usuário", null);
      return false;
    }

    if (isPessoa && (primeiroNome === "" || primeiroNome === null)) {
      setarMensagem("Preencha o campo primeiro nome", null);
      return false;
    }

    if (isPessoa && (sobrenome === "" || sobrenome === null)) {
      setarMensagem("Preencha o campo sobrenome", null);
      return false;
    }

    if (!isPessoa && (siglaOrganizacao === "" || siglaOrganizacao === null)) {
      setarMensagem("Preencha o campo sigla da organização", null);
      return false;
    }

    if (!isPessoa && (nomeOrganizacao === "" || nomeOrganizacao === null)) {
      setarMensagem("Preencha o campo nome da organização", null);
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

    if (enderecoCidade === "" || enderecoCidade === null) {
      setarMensagem("Preencha o campo cidade", null);
      return false;
    }

    if (
      (telefone === "" || telefone === null) &&
      (celular === "" || celular === null)
    ) {
      setarMensagem("Preencha o campo celular ou telefone", null);
      return false;
    }

    return true;
  }

  function cadastrarUsuario(e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    let validaFlgCelulargWhats =
      celular === "" || !flgCelularWhatsapp ? FALSE_PHP : TRUE_PHP;

    let validaFlgTelefoneWhats =
      telefone === "" || flgTelefoneWhatsapp ? FALSE_PHP : TRUE_PHP;

    if (validaCampos()) {
      setIsLoading(true);
      Api.post(
        "users",
        {
          usuario: usuario,
          is_pessoa: isPessoa ? TRUE_PHP : FALSE_PHP,
          primeiro_nome: primeiroNome === "" ? null : primeiroNome,
          sobrenome: sobrenome === "" ? null : sobrenome,
          sigla_organizacao: siglaOrganizacao === "" ? null : siglaOrganizacao,
          nome_organizacao: nomeOrganizacao === "" ? null : nomeOrganizacao,
          email: email,
          senha: senha,
          imagem: imagem,
          endereco_cidade: enderecoCidade,
          endereco_estado: enderecoEstado,
          endereco_pais: enderecoPais,
          telefone: telefone === "" ? null : telefone,
          flg_telefone_whatsapp: validaFlgTelefoneWhats,
          celular: celular === "" ? null : celular,
          flg_celular_whatsapp: validaFlgCelulargWhats,
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

  function mudarFlgTelefoneWhatsapp() {
    setFlgTelefoneWhatsapp(!flgTelefoneWhatsapp);
  }

  function mudarFlgCelularWhatsapp() {
    setFlgCelularWhatsapp(!flgCelularWhatsapp);
  }

  function mudarIsPessoa() {
    setPrimeiroNome("");
    setSobrenome("");
    setSiglaOrganizacao("");
    setNomeOrganizacao("");
    setIsPessoa(!isPessoa);
  }

    // TESTE GOOGLE AUTH
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState("");
  
    const responseGoogle = (response) => {
      console.log(response);

      const {
        profileObj: { name, email, imageUrl },
      } = response;

      setName(name);
      setEmail(email);
      setProfilePic(imageUrl);
      setIsLoggedIn(true);
    };

    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: "260590597996-gstt80pf29kqusj7hh11fv6k3skqvpe4.apps.googleusercontent.com",
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);

  return (
    <>

      <GoogleLogin
				clientId="260590597996-gstt80pf29kqusj7hh11fv6k3skqvpe4.apps.googleusercontent.com"
				buttonText="Continuar com o Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
			/>

			{isLoggedIn ? (
				<div style={{ textAlign: "center" }}>
					<h1>User Information</h1>
					<img className="img-thumbnail" src={profilePic} alt="Profile" />
					<p>Name: {name}</p>
					<p>Email: {email}</p>
				</div>
			) : (
				""
			)}

      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <Form>
          <Row>
            <TituloPagina titulo="Cadastrar Usuário" />
          </Row>

          <Row className="mb-3">
            <Col md={12} className="fw-bold">
              <Button onClick={mudarIsPessoa}>
                {isPessoa ? "Sou organização" : "Sou pessoa"}
              </Button>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="usuario">
                  Usuário
                </Form.Label>
                <Form.Control
                  id="usuario"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={usuario}
                  required
                  autoFocus
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </Form.Group>
            </Col>
            {isPessoa ? (
              <>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-bold" htmlFor="primeiroNome">
                      Primeiro nome
                    </Form.Label>
                    <Form.Control
                      id="primeiroNome"
                      type="text"
                      placeholder="Digite seu primeiro nome"
                      value={primeiroNome}
                      required
                      onChange={(e) => setPrimeiroNome(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-bold" htmlFor="sobrenome">
                      Sobrenome
                    </Form.Label>
                    <Form.Control
                      id="sobrenome"
                      type="text"
                      placeholder="Digite seu sobrenome"
                      value={sobrenome}
                      required
                      onChange={(e) => setSobrenome(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </>
            ) : (
              <>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-bold" htmlFor="siglaOrganizacao">
                      Sigla da organização
                    </Form.Label>
                    <Form.Control
                      id="siglaOrganizacao"
                      type="text"
                      placeholder="Digite a sigla da sua organização"
                      value={siglaOrganizacao}
                      required
                      onChange={(e) => setSiglaOrganizacao(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-bold" htmlFor="nomeOrganizacao">
                      Nome da organização
                    </Form.Label>
                    <Form.Control
                      id="nomeOrganizacao"
                      type="text"
                      placeholder="Digite o nome da sua organização"
                      value={nomeOrganizacao}
                      required
                      onChange={(e) => setNomeOrganizacao(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>

          <Row className="mb-3">
            <Col md={6}>
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
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="imagem">
                  Imagem
                </Form.Label>
                <Form.Control
                  id="imagem"
                  type="file"
                  onChange={(e) => setImagem(e.target.files[0])}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
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
            </Col>
            <Col md={6}>
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
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="enderecoPais">
                  País
                </Form.Label>
                <Form.Control
                  id="enderecoPais"
                  type="text"
                  placeholder="Digite o seu país, exemplo: Brasil"
                  value={enderecoPais}
                  required
                  onChange={(e) => setEnderecoPais(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="enderecoEstado">
                  Estado
                </Form.Label>
                <Form.Control
                  id="enderecoEstado"
                  type="text"
                  placeholder="Digite o seu estado, exemplo: Ceará"
                  value={enderecoEstado}
                  required
                  onChange={(e) => setEnderecoEstado(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="enderecoCidade">
                  Cidade
                </Form.Label>
                <Form.Control
                  id="enderecoCidade"
                  type="text"
                  placeholder="Digite a sua cidade, exemplo: Fortaleza"
                  value={enderecoCidade}
                  required
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="telefone">
                  Telefone
                </Form.Label>
                <Form.Control
                  id="telefone"
                  type="text"
                  placeholder="Digite seu telefone, somente números"
                  value={telefone}
                  required
                  onChange={(e) => setTelefone(e.target.value)}
                  minLength={8}
                />
              </Form.Group>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-start align-items-center py-3"
            >
              <Form.Check
                onChange={mudarFlgTelefoneWhatsapp}
                variant="secondary"
                id="flgTelefoneWhatsapp"
                label="Telefone é whatsapp?"
              ></Form.Check>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold" htmlFor="celular">
                  Celular
                </Form.Label>
                <Form.Control
                  id="celular"
                  type="text"
                  placeholder="Digite seu celular, somente números incluido DDD, exemplo: 85991234567"
                  value={celular}
                  required
                  onChange={(e) => setCelular(e.target.value)}
                  minLength={11}
                />
              </Form.Group>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-start align-items-center py-3"
            >
              <Form.Check
                onChange={mudarFlgCelularWhatsapp}
                variant="secondary"
                id="flgCelularWhatsapp"
                label="Celular é whatsapp?"
              ></Form.Check>
            </Col>
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
        </Form>
      )}
    </>
  );
}

export default UsuarioCadastrar;
