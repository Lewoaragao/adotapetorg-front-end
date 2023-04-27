import React from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header({ logo }) {
    return (
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
                        <Nav.Link href="/usuario/sair">Sair</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header