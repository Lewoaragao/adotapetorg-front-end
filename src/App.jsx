// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Inicio from './components/pages/inicio/Inicio';
// import Sobre from './components/pages/sobre/Sobre';
// import UsuarioCadastrar from './components/pages/usuario/UsuarioCadastrar';
// import UsuarioEntrar from './components/pages/usuario/UsuarioEntrar';
import './App.css';
import { Container } from 'react-bootstrap';
import logo from './images/logo.jpg';
import Header from './components/template/header/Header';
import { Outlet } from 'react-router-dom';
import BtnVoltarTopo from './components/buttons/BtnVoltarTopo';
import Footer from './components/template/footer/Footer';
function App() {
  return (
    <>
      <Header logo={logo} />
      <Container className="vh-100 my-5">
        <Outlet />
      </Container>
      <BtnVoltarTopo />
      <Footer logo={logo} />
    </>

    // MÉTODO DE ROTAS ANTIGO
    // <BrowserRouter>
    //   <Container className="vh-100 my-5">
    // <Header logo={logo} />
    //     <Routes>
    //       <Route path="/" element={<Inicio logo={logo} />} />
    //       <Route path="/sobre" element={<Sobre />} />
    //       <Route path="/usuario/cadastrar" element={<UsuarioCadastrar />} />
    //       <Route path="/usuario/entrar" element={<UsuarioEntrar />} />
    //     </Routes>
    //   </Container>
    // <Footer logo={logo} />
    // </BrowserRouter>
  )
}

export default App