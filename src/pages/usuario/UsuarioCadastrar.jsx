import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, NavLink } from "react-router-dom";
import Mensagem from "./../../components/mensagem/Mensagem";
import Api from "../../services/Api";
import TituloPagina from "./../../components/TituloPagina";
import Carregamento from "../../components/Carregamento";
import { Col, Row } from "react-bootstrap";
import { CONST_FALSE_PHP, CONST_TRUE_PHP } from "../../components/Constantes";

function UsuarioCadastrar() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [imagem, setImagem] = useState("");
  const [ruaEndereco, setRuaEndereco] = useState("");
  const [numeroEndereco, setNumeroEndereco] = useState("");
  const [complementoEndereco, setComplementoEndereco] = useState("");
  const [bairroEndereco, setBairroEndereco] = useState("");
  const [estadoEndereco, setEstadoEndereco] = useState("");
  const [cidadeEndereco, setCidadeEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [flgWhatsapp, setFlgWhatsapp] = useState(false);
  const [isPessoaFisica, setIsPessoaFisica] = useState(true);
  const [msg, setMsg] = useState("");
  const [msgTipo] = useState("warning");
  const [isLoading, setIsLoading] = useState(false);

  function validaCampos() {
    if (nome === "" || nome === null) {
      setMsg("Preencha o campo nome");
      return false;
    }

    if (sobrenome === "" || sobrenome === null) {
      setMsg("Preencha o campo sobrenome");
      return false;
    }

    if (dataNascimento === "" || dataNascimento === null) {
      setMsg("Preencha o campo data de nascimento");
      return false;
    }

    if (email === "" || email === null) {
      setMsg("Preencha o campo email");
      return false;
    }

    if (senha === "" || senha === null) {
      setMsg("Preencha a campo senha");
      return false;
    }

    if (senhaRepetida === "" || senhaRepetida === null) {
      setMsg("Preencha o campo repetir senha");
      return false;
    }

    if (senha !== senhaRepetida) {
      setMsg("As senhas estão diferentes");
      return false;
    }

    if (ruaEndereco === "" || ruaEndereco === null) {
      setMsg("Preencha o campo rua");
      return false;
    }

    if (numeroEndereco === "" || numeroEndereco === null) {
      setMsg("Preencha o campo número");
      return false;
    }

    if (bairroEndereco === "" || bairroEndereco === null) {
      setMsg("Preencha o campo bairro");
      return false;
    }

    if (estadoEndereco === "" || estadoEndereco === null) {
      setMsg("Preencha o campo estado");
      return false;
    }

    if (cidadeEndereco === "" || cidadeEndereco === null) {
      setMsg("Preencha o campo cidade");
      return false;
    }

    if (isPessoaFisica && cpf == null) {
      setCnpj("");
      setMsg("Preencha o campo CPF");
      return false;
    }

    if (!isPessoaFisica && cnpj == null) {
      setCpf("");
      setMsg("Preencha o campo CNPJ");
      return false;
    }

    if (
      (telefone === "" || telefone === null) &&
      (celular === "" || celular === null)
    ) {
      setMsg("Preencha o campo celular ou telefone");
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
          nome: nome,
          sobrenome: sobrenome,
          data_nascimento: dataNascimento,
          email: email,
          senha: senha,
          imagem: imagem,
          rua_endereco: ruaEndereco,
          numero_endereco: numeroEndereco,
          bairro_endereco: bairroEndereco,
          estado_endereco: estadoEndereco,
          cidade_endereco: cidadeEndereco,
          cpf: isPessoaFisica ? cpf : null,
          cnpj: isPessoaFisica ? null : cnpj,
          telefone: telefone === "" ? null : telefone,
          celular: celular === "" ? null : celular,
          flg_whatsapp: flgWhatsapp ? CONST_TRUE_PHP : CONST_FALSE_PHP,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then(() => {
          navigate("/usuario/entrar");
        })
        .catch(({ response }) => {
          setMsg(response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function mudarflgWhatsapp() {
    setFlgWhatsapp(!flgWhatsapp);
  }

  function mudarIsPessoaFisica(event) {
    const value = event.target.value;
    const valueBoolean = value === "true" ? true : false;
    setIsPessoaFisica(valueBoolean);
  }

  return (
    <>
      {isLoading ? (
        <Carregamento />
      ) : (
        <Form>
          <Row>
            <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

            <TituloPagina titulo="Cadastrar Usuário" />
          </Row>
          <Row>
            <Col md={4} className="mb-3">
              <Col>
                <Form.Label className="fw-bold">
                  Você é pessoa física?
                </Form.Label>
              </Col>
              <Col className="d-flex gap-3" onChange={mudarIsPessoaFisica}>
                <div>
                  <input
                    className="me-1"
                    type="radio"
                    name="isPessoaFisica"
                    id="isPessoaFisicaTrue"
                    value="true"
                    checked={isPessoaFisica}
                  />
                  <label htmlFor="isPessoaFisicaTrue">Sim</label>
                </div>
                <div>
                  <input
                    className="me-1"
                    type="radio"
                    name="isPessoaFisica"
                    id="isPessoaFisicaFalse"
                    value="false"
                    checked={!isPessoaFisica}
                  />
                  <label htmlFor="isPessoaFisicaFalse">Não</label>
                </div>
              </Col>
            </Col>

            {isPessoaFisica ? (
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="cpf">
                    CPF
                  </Form.Label>
                  <Form.Control
                    id="cpf"
                    type="text"
                    placeholder="Digite seu CPF"
                    value={cpf}
                    required
                    minLength="11"
                    maxLength="11"
                    onChange={(e) => setCpf(e.target.value)}
                    disabled={!isPessoaFisica}
                  />
                </Form.Group>
              </Col>
            ) : (
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="cnpj">
                    CNPJ
                  </Form.Label>
                  <Form.Control
                    id="cnpj"
                    type="text"
                    placeholder="Digite seu CNPJ"
                    value={cnpj}
                    required
                    minLength="14"
                    maxLength="14"
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </Form.Group>
              </Col>
            )}
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="nome">
                  Nome
                </Form.Label>
                <Form.Control
                  id="nome"
                  type="text"
                  placeholder="Digite seu primeiro nome"
                  value={nome}
                  required
                  autoFocus
                  onChange={(e) => setNome(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="sobrenome">
                  Sobrenome
                </Form.Label>
                <Form.Control
                  id="sobrenome"
                  type="text"
                  placeholder="Digite o restante do seu nome"
                  value={sobrenome}
                  required
                  onChange={(e) => setSobrenome(e.target.value)}
                  disabled={!isPessoaFisica}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="dataNascimento">
                  Data de nascimento
                </Form.Label>
                <Form.Control
                  id="dataNascimento"
                  type="date"
                  placeholder="Digite o restante do seu nome"
                  value={dataNascimento}
                  required
                  onChange={(e) => setDataNascimento(e.target.value)}
                  disabled={!isPessoaFisica}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
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
              <Form.Group className="mb-3">
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

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
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
              <Form.Group className="mb-3">
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

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="ruaEndereco">
                  Rua
                </Form.Label>
                <Form.Control
                  id="ruaEndereco"
                  type="text"
                  placeholder="Digite sua rua"
                  value={ruaEndereco}
                  required
                  onChange={(e) => setRuaEndereco(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="numeroEndereco">
                  Número
                </Form.Label>
                <Form.Control
                  id="numeroEndereco"
                  type="text"
                  placeholder="Digite o número do seu endereço"
                  value={numeroEndereco}
                  required
                  onChange={(e) => setNumeroEndereco(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="complementoEndereco">
                  Complemento
                </Form.Label>
                <Form.Control
                  id="complementoEndereco"
                  type="text"
                  placeholder="Se quiser pode descrever um ponto de referência"
                  value={complementoEndereco}
                  required
                  onChange={(e) => setComplementoEndereco(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="bairroEndereco">
                  Bairro
                </Form.Label>
                <Form.Control
                  id="bairroEndereco"
                  type="text"
                  placeholder="Digite sua rua"
                  value={bairroEndereco}
                  required
                  onChange={(e) => setBairroEndereco(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="estadoEndereco">
                  Estado
                </Form.Label>
                <Form.Control
                  id="estadoEndereco"
                  type="text"
                  placeholder="Digite o número do seu endereço"
                  value={estadoEndereco}
                  required
                  onChange={(e) => setEstadoEndereco(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="cidadeEndereco">
                  Cidade
                </Form.Label>
                <Form.Control
                  id="cidadeEndereco"
                  type="text"
                  placeholder="Digite o número do seu endereço"
                  value={cidadeEndereco}
                  required
                  onChange={(e) => setCidadeEndereco(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="telefone">
                  Telefone
                </Form.Label>
                <Form.Control
                  id="telefone"
                  type="text"
                  placeholder="Digite seu telefone"
                  value={telefone}
                  required
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="celular">
                  Celular
                </Form.Label>
                <Form.Control
                  id="celular"
                  type="text"
                  placeholder="Digite seu celular"
                  value={celular}
                  required
                  onChange={(e) => setCelular(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col
              md={4}
              className="d-flex justify-content-start align-items-center py-3"
            >
              <Form.Check
                onChange={mudarflgWhatsapp}
                variant="secondary"
                id="flgWhatsapp"
                label="Celular é whatsapp?"
              ></Form.Check>
            </Col>
          </Row>

          <Button variant="primary" type="submit" onClick={cadastrarUsuario}>
            Cadastrar
          </Button>

          <p className="mt-3">
            Já possui uma conta?{" "}
            <NavLink
              className="nav-link d-inline text-decoration-underline"
              to="/usuario/entrar"
            >
              Entrar
            </NavLink>
          </p>
        </Form>
      )}
    </>
  );
}

export default UsuarioCadastrar;
