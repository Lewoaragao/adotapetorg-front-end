import React, { useContext, useState } from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Api from '../../../services/Api';
import { NavLink, useNavigate } from 'react-router-dom';
import Mensagem from './../../mensagem/Mensagem';
import { AuthContext } from '../../../contexts/AuthContext';

function Header({ logo }) {
    const navigate = useNavigate()

    const [msg, setMsg] = useState("")
    const [msgTipo, setMsgTipo] = useState("danger")

    const token = localStorage.getItem('token')

    const { isUsuarioLogado, setarIsUsuarioLogado, usuarioLogado, setarUsuarioLogado } = useContext(AuthContext)

    function logout() {
        Api.get("logout", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            localStorage.removeItem('token')
            setarIsUsuarioLogado(false)
            setarUsuarioLogado({})
            limpaCampos()
            redirecionaTela()
        }).catch(({ response }) => {
            setMsg(response.data.message)
        })
    }

    function limpaCampos() {
        setMsg("")
        setMsgTipo("")
    }

    function redirecionaTela() {
        navigate("/")
    }

    return (
        <>
            <Navbar sticky="top" bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top rounded"
                            alt="Adota Pet Org logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <NavLink className="nav nav-link text-secondary" to="/">Início</NavLink>
                            <NavLink className="nav nav-link text-secondary" to="/sobre">Sobre</NavLink>
                            {isUsuarioLogado
                                ?
                                <>
                                    <p className="nav nav-link text-primary fw-bold">Olá, {usuarioLogado.nome}</p>
                                    <button className="nav nav-link text-secondary" onClick={logout}>Sair</button>
                                </>
                                :
                                <>
                                    <NavLink className="nav nav-link text-secondary" to="/usuario/cadastrar">Cadastrar</NavLink>
                                    <NavLink className="nav nav-link text-primary fw-bold" to="/usuario/entrar">Entrar</NavLink>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-3">
                <Mensagem mensagem={msg} mensagemTipo={msgTipo} />
            </Container>
        </>
    )
}

export default Header