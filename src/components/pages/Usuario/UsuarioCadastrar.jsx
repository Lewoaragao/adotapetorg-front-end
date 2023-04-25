import React, { useState } from 'react'
import Mensagem from '../../mensagem/Mensagem'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import api from '../../../services/api';

function UsuarioCadastrar() {
  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [senhaRepetida, setSenhaRepetida] = useState("")
  const [msg, setMsg] = useState("")
  const [msgTipo, setMsgTipo] = useState("warning")

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
      api.post("users", {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha
      }).then(() => {
        limpaCampos()
        redirecionaTela()
      }).catch(({ response }) => {
        setMsg(response.data.message)
      })
    }
  }

  function limpaCampos() {
    setNome("")
    setSobrenome("")
    setEmail("")
    setSenha("")
    setSenhaRepetida("")
    setMsg("")
    setMsgTipo("")
  }

  function redirecionaTela() {
    navigate("/usuario/entrar")
  }

  return (
    <Form className="container col-md-6 mt-3">
      <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

      <Form.Group className="mb-3">
        <Form.Label htmlFor="nome">Nome</Form.Label>
        <Form.Control id="nome" type="text" placeholder="Digite seu nome" value={nome} required autoFocus
          onChange={(e) => {
            setNome(e.target.value)
          }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="sobrenome">Sobrenome</Form.Label>
        <Form.Control id="sobrenome" type="text" placeholder="Digite seu sobrenome" value={sobrenome} required
          onChange={(e) => {
            setSobrenome(e.target.value)
          }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">E-mail</Form.Label>
        <Form.Control id="email" type="email" placeholder="Digite seu e-mail" value={email} required
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
    </Form>
  );
}

export default UsuarioCadastrar;