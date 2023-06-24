import React, { useContext, useState } from "react";
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

function UsuarioCadastrar() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
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

    if (primeiroNome === "" || primeiroNome === null) {
      setarMensagem("Preencha o campo primeiro nome", null);
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

    if (validaCampos()) {
      setIsLoading(true);
      Api.post(
        "users",
        {
          usuario: usuario,
          primeiro_nome: primeiroNome,
          sobrenome: sobrenome,
          email: email,
          senha: senha,
          imagem: imagem,
          endereco_cidade: enderecoCidade,
          endereco_estado: enderecoEstado,
          endereco_pais: enderecoPais,
          telefone: telefone === "" ? null : telefone,
          flg_telefone_whatsapp: flgTelefoneWhatsapp ? TRUE_PHP : FALSE_PHP,
          celular: celular === "" ? null : celular,
          flg_celular_whatsapp: flgCelularWhatsapp ? TRUE_PHP : FALSE_PHP,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then(() => {
          Api.post("login", {
            email: email,
            senha: senha,
          })
            .then(({ data }) => {
              setarUsuarioLogado(data.usuario, data.token, true);
              window.scrollTo(0, 0);
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
          return;
        });
    }
  }

  function mudarflgTelefoneWhatsapp() {
    setFlgTelefoneWhatsapp(!flgTelefoneWhatsapp);
  }

  function mudarflgCelularWhatsapp() {
    setFlgCelularWhatsapp(!flgCelularWhatsapp);
  }

  const handleIsPessoaChange = (e) => {
    setIsPessoa(e.target.value === "true" ? true : false);
  };

  return (
    <>
      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <Form>
          <Row>
            <TituloPagina titulo="Cadastrar Usuário" />
          </Row>

          <Row>
            <Col md={12} className="fw-bold">
              <input
                className="me-1"
                type="radio"
                name="isPessoa"
                value="true"
                id="isPessoaTrue"
                checked={isPessoa}
                onChange={(e) => {
                  console.log("teste");
                }}
              />
              <label htmlFor="isPessoaTrue">Sou Pessoa</label>

              <input
                className="ms-3 me-1"
                type="radio"
                name="isPessoa"
                value="false"
                id="isPessoaFalse"
                checked={isPessoa}
                onChange={handleIsPessoaChange}
              />
              <label htmlFor="isPessoaFalse">Sou Organização</label>
            </Col>
            <Col md={12}>
              <p className="text-muted">
                Os campos com <span className="text-danger">*</span> são
                necessários serem preenchidos, juntamente do número de contato e
                selecionar se o número também é Whatsapp
              </p>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="usuario">
                  Usuário <span className="text-danger">*</span>
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
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="primeiroNome">
                  {isPessoa ? "Primeiro nome" : "Sigla da Organização"}{" "}
                  <span className="text-danger">*</span>
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
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="sobrenome">
                  {isPessoa ? "Sobrenome" : "Nome da Organização"}
                </Form.Label>
                <Form.Control
                  id="sobrenome"
                  type="text"
                  placeholder="Digite seu primeiro nome"
                  value={sobrenome}
                  required
                  onChange={(e) => setSobrenome(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="email">
                  E-mail <span className="text-danger">*</span>
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
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="imagem">
                  Imagem <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  id="imagem"
                  type="file"
                  onChange={(e) => setImagem(e.target.files[0])}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="senha">
                  Senha <span className="text-danger">*</span>
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
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="senhaRepetida">
                  Repetir senha <span className="text-danger">*</span>
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

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="enderecoPais">
                  País <span className="text-danger">*</span>
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
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="enderecoEstado">
                  Estado <span className="text-danger">*</span>
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
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="enderecoCidade">
                  Cidade <span className="text-danger">*</span>
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

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
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
                  maxLength={8}
                />
              </Form.Group>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-start align-items-center py-3"
            >
              <Form.Check
                onChange={mudarflgTelefoneWhatsapp}
                variant="secondary"
                id="flgTelefoneWhatsapp"
                label="Telefone é whatsapp?"
              ></Form.Check>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
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
                  maxLength={11}
                />
              </Form.Group>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-start align-items-center py-3"
            >
              <Form.Check
                onChange={mudarflgCelularWhatsapp}
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
