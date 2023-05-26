import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LinkItem from "../../components/LinkItem";
import TituloPagina from "../../components/TituloPagina";

/**
 * Página onde serão exibidos os links
 * cadastrados pelos usuários
 * @since 25/05/2023 23:37:30
 * @author Leonardo Aragão
 */
export default function Link() {
  const { nomeUsuario } = useParams();
  return (
    <Container>
      <TituloPagina titulo={`Links: ${nomeUsuario}`} />

      <LinkItem titulo="Site" url="https://adotapet.org" />
      <LinkItem titulo="Instagram" url="https://instagram.com/adotapetorg" />
      <LinkItem titulo="Twitter" url="https://twitter.com/adotapetorg" />
      <LinkItem titulo="Facebook" url="https://facebook.com/adotapetorg" />
    </Container>
  );
}
