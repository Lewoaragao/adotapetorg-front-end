import { Card, Col, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import NavLinkToTop from "./navLinkToTop/NavLinkToTop";

export default function CarregamentoTela() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spinner variant="warning" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export function CarregamentoBotao({ variant }) {
  return (
    <>
      <Spinner size="sm" variant={variant} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}

export function CarregamentoListaPet() {
  const numeroPetsPorPagina = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {numeroPetsPorPagina.map((n) => (
          <Col key={n}>
            <Card>
              <Card.Img
                variant="top"
                src="https://api.adotapet.org/api/imagens/pet/placeholder-pet.jpg"
                alt={`foto carregamento lista pet`}
              />
              <Card.Body>
                <Card.Title>Carregando...</Card.Title>
                <Card.Text>Carregando...</Card.Text>
              </Card.Body>
              <Card.Footer>
                <NavLinkToTop disabled="true">Carregando...</NavLinkToTop>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
