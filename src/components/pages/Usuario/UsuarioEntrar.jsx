import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Mensagem from '../../mensagem/Mensagem';
import { useNavigate } from "react-router-dom";
import Api from '../../../services/Api';

function UsuarioEntrar() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [msg, setMsg] = useState("")
  const [msgTipo, setMsgTipo] = useState("warning")

  function validaCampos() {
    if (email === "" || email === null) {
      setMsg("Preencha o campo email")
      return false
    }

    if (senha === "" || senha === null) {
      setMsg("Preencha a campo senha")
      return false
    }

    return true
  }

  function limpaCampos() {
    setEmail("")
    setSenha("")
    setMsg("")
    setMsgTipo("")
  }

  function redirecionaTela() {
    navigate("/")
  }

  function entrarUsuario() {
    if (validaCampos()) {
      Api.post("login", {
        email: email,
        senha: senha
      }).then(({ data }) => {
        localStorage.setItem('token', data.token);
        limpaCampos()
        redirecionaTela()
      }).catch(({ response }) => {
        setMsg(response.data.message)
      })
    }
  }

  return (
    <Form className="container col-md-6">
      <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">E-mail</Form.Label>
        <Form.Control id="email" type="email" placeholder="Enter email" value={email} required
          onChange={(e) => {
            setEmail(e.target.value)
          }} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="senha">Senha</Form.Label>
        <Form.Control id="senha" type="password" placeholder="Password" value={senha} required
          onChange={(e) => {
            setSenha(e.target.value)
          }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Lembre-me" />
      </Form.Group>

      <Button variant="primary" type="submit"
        onClick={(e) => {
          e.preventDefault()
          entrarUsuario()
        }}>
        Entrar
      </Button>
    </Form>
  );
}

export default UsuarioEntrar;