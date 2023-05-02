import './App.css';
import { Container } from 'react-bootstrap';
import logo from './images/logo.jpg';
import { Outlet } from 'react-router-dom';
import BtnVoltarTopo from './components/buttons/BtnVoltarTopo';
import { useContext, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Header from './pages/template/header/Header'
import Footer from './pages/template/footer/Footer';

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