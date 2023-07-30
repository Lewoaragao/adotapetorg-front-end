import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import BtnVoltarTopo from "./components/buttons/BtnVoltarTopo";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import logo from "./images/logo-adotapetorg.jpg";
import Footer from "./pages/template/footer/Footer";
import Header from "./pages/template/header/Header";

export default function App() {
  const location = useLocation();
  const { pathname } = location;

  const { verificaUsuarioLogado } = useContext(AuthContext);
  const [usuarioLogadoVerificado, setUsuarioLogadoVerificado] = useState(false);

  if (usuarioLogadoVerificado === false) {
    verificaUsuarioLogado();
    setUsuarioLogadoVerificado(true);
  }

  const renderContent = () => {
    /**
     * O elemento que é gerado por esse pathname, serão os
     * links cadastrado para que o usuário mostre eles
     * como um link na bio
     */
    if (pathname.startsWith("/link/")) {
      // Renderiza o conteúdo sem o header e o footer
      return <Outlet />;
    } else {
      // Renderiza o conteúdo padrão com o header e o footer
      return (
        <>
          <Header
            logo={logo}
            usuarioLogadoVerificado={usuarioLogadoVerificado}
          />
          <Container className="my-3">
            <Outlet />
          </Container>
          <BtnVoltarTopo />
          <Footer logo={logo} />
        </>
      );
    }
  };

  return <AuthProvider>{renderContent()}</AuthProvider>;
}
