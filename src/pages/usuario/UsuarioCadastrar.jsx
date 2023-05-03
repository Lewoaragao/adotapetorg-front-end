import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate, NavLink } from "react-router-dom";
import Mensagem from './../../components/mensagem/Mensagem';
import Api from '../../services/Api';
import TituloPagina from './../../components/TituloPagina';

function UsuarioCadastrar() {
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [senhaRepetida, setSenhaRepetida] = useState("")
  const [msg, setMsg] = useState("")
  const [msgTipo] = useState("warning")

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

    return true
  }

  function cadastrarUsuario() {
    if (validaCampos()) {
      Api.post("users", {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha
      }).then(() => {
        navigate("/usuario/entrar")
      }).catch(({ response }) => {
        setMsg(response.data.message)
      })
    }
  }

  return (
    <Form className="container col-md-6">
      <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

      <TituloPagina titulo="Cadastrar"/>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="nome">Nome</Form.Label>
        <Form.Control id="nome" type="text" placeholder="Digite seu primeiro nome" value={nome} required autoFocus
          onChange={(e) => {
            setNome(e.target.value)
          }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="sobrenome">Sobrenome</Form.Label>
        <Form.Control id="sobrenome" type="text" placeholder="Digite o restante do seu nome" value={sobrenome} required
          onChange={(e) => {
            setSobrenome(e.target.value)
          }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">E-mail</Form.Label>
        <Form.Control id="email" type="email" placeholder="Digite seu melhor e-mail" value={email} required
          onChange={(e) => {
            setEmail(e.target.value)
          }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="senha">Senha</Form.Label>
        <Form.Control id="senha" type="password" placeholder="Digite sua senha" value={senha} required
          onChange={(e) => {
            setSenha(e.target.value)
          }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="senhaRepetida">Repetir senha</Form.Label>
        <Form.Control id="senhaRepetida" type="password" placeholder="Repita a senha" value={senhaRepetida} required
          onChange={(e) => {
            setSenhaRepetida(e.target.value)
          }} />
      </Form.Group>

      <Button variant="primary" type="submit"
        onClick={(e) => {
          e.preventDefault()
          cadastrarUsuario()
        }}>
        Cadastrar
      </Button>

      <p className="mt-3">Já possui uma conta? <NavLink className="nav-link d-inline text-decoration-underline" to="/usuario/entrar">Entrar</NavLink></p>
    </Form>
  );
}

export default UsuarioCadastrar;