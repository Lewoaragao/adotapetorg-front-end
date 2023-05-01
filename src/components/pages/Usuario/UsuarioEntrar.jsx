import { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Mensagem from '../../mensagem/Mensagem';
import { useNavigate } from "react-router-dom";
import Api from '../../../services/Api';
import { AuthContext } from '../../../contexts/AuthContext';

function UsuarioEntrar() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [lembreMe, setLembreMe] = useState(false)
  const [msg, setMsg] = useState("")
  const [msgTipo] = useState("warning")
  const { setarUsuarioLogado } = useContext(AuthContext)

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

  function entrarUsuario() {
    if (validaCampos()) {
      Api.post("login", {
        email: email,
        senha: senha
      }).then(({ data }) => {
        if (lembreMe) {
          localStorage.setItem('token', data.token)
        }
        setarUsuarioLogado(data.usuario, data.token, true)
        navigate("/")
      }).catch(({ response }) => {
        setMsg(response.data.message)
      })
    }
  }

  return (
    <Form className="container col-md-6">
      <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

      <h1 className="fw-bold">Entrar</h1>

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
        <Form.Check type="checkbox" label="Lembre-me"
          onChange={(e) => {
            setLembreMe(e.target.value)
          }} />
      </Form.Group>

      <Button variant="primary" type="submit"
        onClick={
          (e) => {
            e.preventDefault()
            entrarUsuario()
          }
        }>
        Entrar
      </Button>
    </Form>
  );
}

export default UsuarioEntrar;