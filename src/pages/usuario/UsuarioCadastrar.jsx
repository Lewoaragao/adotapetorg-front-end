import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate, NavLink } from "react-router-dom";
import Mensagem from './../../components/mensagem/Mensagem';
import Api from '../../services/Api';
import TituloPagina from './../../components/TituloPagina';
import Carregamento from '../../components/Carregamento';
import { Col, Row } from 'react-bootstrap';

function UsuarioCadastrar() {
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [senhaRepetida, setSenhaRepetida] = useState("")
  const [imagem, setImagem] = useState("")
  const [ruaEndereco, setRuaEndereco] = useState("")
  const [numeroEndereco, setNumeroEndereco] = useState("")
  const [complementoEndereco, setComplementoEndereco] = useState("")
  const [bairroEndereco, setBairroEndereco] = useState("")
  const [estadoEndereco, setEstadoEndereco] = useState("")
  const [cidadeEndereco, setCidadeEndereco] = useState("")
  const [cpf, setCpf] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [telefone, setTelefone] = useState("")
  const [telefoneIsWhatsapp, setTelefoneIsWhatsapp] = useState(false)
  const [isPessoaFisica, setIsPessoaFisica] = useState(false)
  const [msg, setMsg] = useState("")
  const [msgTipo] = useState("warning")
  const [isLoading, setIsLoading] = useState(false)

  function validaCampos() {
    if (nome === "" || nome === null) {
      setMsg("Preencha o campo nome")
      return false
    }

    if (sobrenome === "" || sobrenome === null) {
      setMsg("Preencha o campo sobrenome")
      return false
    }

    if (email === "" || email === null) {
      setMsg("Preencha o campo email")
      return false
    }

    if (senha === "" || senha === null) {
      setMsg("Preencha a campo senha")
      return false
    }

    if (senhaRepetida === "" || senhaRepetida === null) {
      setMsg("Preencha o campo repetir senha")
      return false
    }

    if (senha !== senhaRepetida) {
      setMsg("As senhas estão diferentes")
      return false
    }

    if (ruaEndereco === "" || ruaEndereco === null) {
      setMsg("Preencha o campo rua")
      return false
    }

    if (numeroEndereco === "" || numeroEndereco === null) {
      setMsg("Preencha o campo número")
      return false
    }

    if (bairroEndereco === "" || bairroEndereco === null) {
      setMsg("Preencha o campo bairro")
      return false
    }

    if (estadoEndereco === "" || estadoEndereco === null) {
      setMsg("Preencha o campo estado")
      return false
    }

    if (cidadeEndereco === "" || cidadeEndereco === null) {
      setMsg("Preencha o campo cidade")
      return false
    }

    if (isPessoaFisica && cpf == null) {
      setMsg("Preencha o campo CPF")
      return false
    }

    if (!isPessoaFisica && cnpj == null) {
      setMsg("Preencha o campo CNPJ")
      return false
    }

    return true
  }

  function cadastrarUsuario() {
    if (validaCampos()) {
      setIsLoading(true)
      Api.post("users", {
        nome: nome,
        sobrenome: sobrenome,
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
        telefone: telefone,
        telefone_is_whatsapp: telefoneIsWhatsapp,
      },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }).then(() => {
          navigate("/usuario/entrar")
        }).catch(({ response }) => {
          setMsg(response.data.message)
        }).finally(() => {
          setIsLoading(false)
        })
    }
  }

  function mudarPessoaFisicaJuridica() {
    setIsPessoaFisica(!isPessoaFisica)
  }

  function mudarTelefoneIsWhatsapp() {
    setTelefoneIsWhatsapp(!telefoneIsWhatsapp)
  }

  return (
    <>
      {isLoading
        ?
        <Carregamento />
        :
        <Form className="container col-md-12 col-lg-8">
          <Row>
            <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

            <TituloPagina titulo="Cadastrar Usuário" />
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="nome">Nome</Form.Label>
                <Form.Control id="nome" type="text" placeholder="Digite seu primeiro nome" value={nome} required autoFocus
                  onChange={(e) => {
                    setNome(e.target.value)
                  }} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="sobrenome">Sobrenome</Form.Label>
                <Form.Control id="sobrenome" type="text" placeholder="Digite o restante do seu nome" value={sobrenome} required
                  onChange={(e) => {
                    setSobrenome(e.target.value)
                  }} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="email">E-mail</Form.Label>
                <Form.Control id="email" type="email" placeholder="Digite seu melhor e-mail" value={email} required
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="imagem">Imagem</Form.Label>
                <Form.Control id="imagem" type="file" onChange={(e) =>
                  setImagem(e.target.files[0]
                  )} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="senha">Senha</Form.Label>
                <Form.Control id="senha" type="password" placeholder="Digite sua senha" value={senha} required
                  onChange={(e) => {
                    setSenha(e.target.value)
                  }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="senhaRepetida">Repetir senha</Form.Label>
                <Form.Control id="senhaRepetida" type="password" placeholder="Repita a senha" value={senhaRepetida} required
                  onChange={(e) => {
                    setSenhaRepetida(e.target.value)
                  }} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="ruaEndereco">Rua</Form.Label>
                <Form.Control id="ruaEndereco" type="text" placeholder="Digite sua rua" value={ruaEndereco} required
                  onChange={(e) => {
                    setRuaEndereco(e.target.value)
                  }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="numeroEndereco">Número</Form.Label>
                <Form.Control id="numeroEndereco" type="text" placeholder="Digite o número do seu endereço" value={numeroEndereco} required
                  onChange={(e) => {
                    setNumeroEndereco(e.target.value)
                  }} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="complementoEndereco">Complemento</Form.Label>
                <Form.Control id="complementoEndereco" type="text" placeholder="Se quiser pode descrever um ponto de referência" value={complementoEndereco} required
                  onChange={(e) => {
                    setComplementoEndereco(e.target.value)
                  }} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="bairroEndereco">Bairro</Form.Label>
                <Form.Control id="bairroEndereco" type="text" placeholder="Digite sua rua" value={bairroEndereco} required
                  onChange={(e) => {
                    setBairroEndereco(e.target.value)
                  }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="estadoEndereco">Estado</Form.Label>
                <Form.Control id="estadoEndereco" type="text" placeholder="Digite o número do seu endereço" value={estadoEndereco} required
                  onChange={(e) => {
                    setEstadoEndereco(e.target.value)
                  }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="cidadeEndereco">Cidade</Form.Label>
                <Form.Control id="cidadeEndereco" type="text" placeholder="Digite o número do seu endereço" value={cidadeEndereco} required
                  onChange={(e) => {
                    setCidadeEndereco(e.target.value)
                  }} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="container col-md-6 col-lg-6 mb-2">
          </Row>

          <Row>
            <Col className="col-4 d-flex justify-content-center align-items-center pt-2">
              <Button
                className="w-100"
                onClick={mudarPessoaFisicaJuridica}
                variant="secondary">
                Mudar para pessoa jurídica
              </Button>
            </Col>

            {isPessoaFisica
              ?
              <Col className="col-8">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="cpf">CPF</Form.Label>
                  <Form.Control id="cpf" type="text" placeholder="Digite seu CPF" value={cpf} required
                    onChange={(e) => {
                      setCpf(e.target.value)
                    }} />
                </Form.Group>
              </Col>
              :
              <Col className="col-8">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="cnpj">CNPJ</Form.Label>
                  <Form.Control id="cnpj" type="text" placeholder="Digite seu CNPJ" value={cnpj} required
                    onChange={(e) => {
                      setCnpj(e.target.value)
                    }} />
                </Form.Group>
              </Col>
            }
          </Row>

          <Row>
            <Col className="col-4">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="telefone">Telefone</Form.Label>
                <Form.Control id="telefone" type="text" placeholder="Digite seu telefone" value={telefone} required
                  onChange={(e) => {
                    setTelefone(e.target.value)
                  }} />
              </Form.Group>
            </Col>
            <Col className="col-4 d-flex justify-content-start align-items-center pt-3">
              <Form.Check
                onChange={mudarTelefoneIsWhatsapp}
                variant="secondary"
                label="Telefone é whatsapp?">
              </Form.Check>
            </Col>
          </Row>

          <Button variant="primary" type="submit"
            onClick={(e) => {
              e.preventDefault()
              cadastrarUsuario()
            }}>
            Cadastrar
          </Button>

          <p className="mt-3">Já possui uma conta? <NavLink className="nav-link d-inline text-decoration-underline" to="/usuario/entrar">Entrar</NavLink></p>
        </Form>
      }
    </>
  )
}

export default UsuarioCadastrar;