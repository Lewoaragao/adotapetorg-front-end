import { Card, Col } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import NavLinkToTop from "../navLinkToTop/NavLinkToTop";

/**
 * Utilizado para mostrar
 * na lista a postagem passada
 * por parâmetro
 * @since 13/08/2023 09:03:15
 * @author Leonardo Aragão
 */
export default function CardPostagem({ postagem }) {
  return (
    <NavLinkToTop
      className="text-decoration-none card-hover"
      to={`/blog/postagem/${postagem.slug}`}
    >
      <Col key={postagem.id}>
        <Card>
          <div className="image-container">
            <Card.Img
              variant="top"
              src={process.env.REACT_APP_API_URL + postagem.imagem}
              alt={`foto principal da postagem ${postagem.titulo}`}
            />
          </div>
          <Card.Body>
            <Card.Title>{postagem.titulo}</Card.Title>
            <Card.Text>{postagem.subtitulo}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <NavLinkToTop
              className="btn btn-primary d-flex justify-content-center align-items-center gap-1"
              to={`/blog/postagem/${postagem.slug}`}
            >
              <AiOutlineInfoCircle /> Ler
            </NavLinkToTop>
          </Card.Footer>
        </Card>
      </Col>
    </NavLinkToTop>
  );
}
