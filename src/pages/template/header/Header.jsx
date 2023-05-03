import React, { useContext } from 'react'
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Api from '../../../services/Api';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import NavBarUsuarioLogado from './NavBarUsuarioLogado';
import NavBarUsuarioNaoLogado from './NavBarUsuarioNaoLogado';
import { BiHomeHeart } from 'react-icons/bi';
import { AiFillQuestionCircle } from 'react-icons/ai';

function Header({ logo, usuarioLogadoVerificado }) {
    const navigate = useNavigate()
    const { isUsuarioLogado, usuarioLogado, setarUsuarioLogado, token } = useContext(AuthContext)

    function logout() {
        Api.get("logout", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            localStorage.removeItem('token')
            setarUsuarioLogado({}, null, false)
            navigate("/")
        }).catch(({ response }) => {
            console.log(response.data.message)
        })
    }

    return (
        <>
            <Navbar expand="md" sticky="top" bg="light">
                <Container>
                    <NavLink to="/">
                        <img
                            src={logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top rounded"
                            alt="logo adota pet org"
                        />
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav className="gap-2">
                            <NavLink className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1" to="/"><BiHomeHeart /> Início</NavLink>
                            <NavLink className="nav nav-link text-secondary d-flex justify-content-center align-items-center gap-1" to="/sobre"><AiFillQuestionCircle /> Sobre</NavLink>

                            {isUsuarioLogado
                                ?
                                <NavBarUsuarioLogado usuarioLogado={usuarioLogado} logout={logout} />
                                :
                                <NavBarUsuarioNaoLogado />
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header