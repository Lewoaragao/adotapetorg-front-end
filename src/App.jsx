import './App.css';
import Header from './components/template/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './components/pages/inicio/Inicio';
import Sobre from './components/pages/sobre/Sobre';
import { Container } from 'react-bootstrap';
import logo from './images/logo.jpg';
import UsuarioCadastrar from './components/pages/usuario/UsuarioCadastrar';
import UsuarioEntrar from './components/pages/usuario/UsuarioEntrar';
import BtnVoltarTopo from './components/buttons/BtnVoltarTopo';

function App() {
  return (
    <BrowserRouter>
      <Header logo={logo} />
      <Container id="container">
        <Routes>
          <Route path="/" element={<Inicio logo={logo} />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/usuario/cadastrar" element={<UsuarioCadastrar />} />
          <Route path="/usuario/entrar" element={<UsuarioEntrar />} />
        </Routes>
        <BtnVoltarTopo />
      </Container>
    </BrowserRouter>
  )
}

export default App;