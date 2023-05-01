import './App.css';
import { Container } from 'react-bootstrap';
import logo from './images/logo.jpg';
import Header from './components/template/header/Header';
import { Outlet } from 'react-router-dom';
import BtnVoltarTopo from './components/buttons/BtnVoltarTopo';
import Footer from './components/template/footer/Footer';
import { useContext, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
function App() {

  const { verificaUsuarioLogado } = useContext(AuthContext)
  const [usuarioLogadoVerificado, setUsuarioLogadoVerificado] = useState(false)

  if (usuarioLogadoVerificado === false) {
    verificaUsuarioLogado()
    setUsuarioLogadoVerificado(true)
  }

  return (
    <>
      <Header logo={logo} usuarioLogadoVerificado={usuarioLogadoVerificado} />
      <Container className="vh-100 mt-2">
        <Outlet />
      </Container>
      <BtnVoltarTopo />
      <Footer logo={logo} />
    </>
  )
}

export default App