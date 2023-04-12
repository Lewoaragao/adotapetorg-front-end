import './App.css';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './components/pages/Inicio/Inicio';
import Sobre from './components/pages/Sobre/Sobre';
import { Container } from 'react-bootstrap';
import logo from './images/logo.jpg';
import UsuarioCadastrar from './components/pages/Usuario/UsuarioCadastrar';
import UsuarioEntrar from './components/pages/Usuario/UsuarioEntrar';

function App() {
  return (
    <BrowserRouter>
      <Header logo={logo}/>
      <Container>
        <Routes>
          <Route path="/" element={<Inicio logo={logo} />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/usuario/cadastrar" element={<UsuarioCadastrar />} />
          <Route path="/usuario/entrar" element={<UsuarioEntrar />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;
