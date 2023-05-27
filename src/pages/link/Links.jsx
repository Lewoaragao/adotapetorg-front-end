import { useParams } from "react-router-dom";
import LinkItem from "../../components/LinkItem";
import TituloPagina from "../../components/TituloPagina";
import logo from "../../images/logo-adotapetorg.jpg";

/**
 * Página onde serão exibidos os links
 * cadastrados pelos usuários
 * @since 25/05/2023 23:37:30
 * @author Leonardo Aragão
 */
export default function Links() {
  const { nomeUsuario } = useParams();
  return (
    <div align="center">
      <img
        src={logo}
        width="100"
        height="100"
        className="d-inline-block align-top rounded-circle"
        alt="logo adota pet org"
      />

      <TituloPagina titulo={nomeUsuario} />
      <h2 className="mb-4">um amor sem fronteiras</h2>

      <LinkItem titulo="Site" url="https://adotapet.org" />
      <LinkItem titulo="Instagram" url="https://instagram.com/adotapetorg" />
      <LinkItem titulo="Twitter" url="https://twitter.com/adotapetorg" />
      <LinkItem titulo="Facebook" url="https://facebook.com/adotapetorg" />
    </div>
  );
}
