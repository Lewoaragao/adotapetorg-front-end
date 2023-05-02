import { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from "react-router-dom";
import Mensagem from '../../components/mensagem/Mensagem';
import Api from '../../services/Api';
import { AuthContext } from '../../contexts/AuthContext';
import { InputGroup } from 'react-bootstrap';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';

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

      <InputGroup className="mb-3">
        <InputGroup.Text id="email"><HiOutlineMail /></InputGroup.Text>
        <Form.Control id="email" type="email" placeholder="E-mail" value={email} required
          onChange={(e) => {
            setEmail(e.target.value)
          }} />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="senha"><RiLockPasswordFill /></InputGroup.Text>
        <Form.Control id="senha" type="password" placeholder="Senha" value={senha} required
          onChange={(e) => {
            setSenha(e.target.value)
          }} />
      </InputGroup>

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

      <p className="mt-3">Não possui uma conta? <NavLink className="nav-link d-inline text-decoration-underline" to="/usuario/cadastrar">Cadastrar</NavLink></p>
    </Form>
  );
}

export default UsuarioEntrar;