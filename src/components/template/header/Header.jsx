import React, { useState } from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Api from '../../../services/Api';
import { useNavigate } from 'react-router-dom';
import Mensagem from './../../mensagem/Mensagem';

function Header({ logo }) {
    const navigate = useNavigate()

    const [msg, setMsg] = useState("")
    const [msgTipo, setMsgTipo] = useState("danger")

    const token = localStorage.getItem('token')

    function logout() {
        Api.get("logout", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            localStorage.removeItem('token');
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
                            <Nav.Link href="/">Início</Nav.Link>
                            <Nav.Link href="/sobre">Sobre</Nav.Link>
                            <Nav.Link href="/usuario/cadastrar">Cadastrar</Nav.Link>
                            <Nav.Link href="/usuario/entrar">Entrar</Nav.Link>
                            <button className="nav-link" onClick={logout}>Sair</button>
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