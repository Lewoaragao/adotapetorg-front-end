import { useState } from "react";
import { Button, Card, Col, Form, Modal, NavLink, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import TituloPagina from "../../components/TituloPagina";

/**
 * Listar Links do usuário logado
 * para que ele possa atualizá-los
 * @since 26/05/2023 22:40:09
 * @author Leonardo Aragão
 */
export default function LinkMeus() {
  const [imagem, setImagem] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [listaLinks, setListaLinks] = useState([
    {
      tipoLink: 1,
      imagem:
        "https://adotapet.org/static/media/logo-adotapetorg.1ee0b7bd1d67aa9ff009.jpg",
      tituloLink: "Sistema de adoção de Pets",
      link: "https://adotapet.org",
    },
  ]);
  const [showModalCadastrarLink, setShowModalCadastrarLink] = useState(false);

  const handleCloseModalCadastrarLink = () => setShowModalCadastrarLink(false);
  const handleShowModalCadastrarLink = () => setShowModalCadastrarLink(true);

  return (
    <>
      <TituloPagina titulo="Meus Links" />

      <button
        className="btn btn-warning d-flex justify-content-center align-items-center gap-1 mb-4"
        onClick={handleShowModalCadastrarLink}
      >
        <AiOutlinePlus /> Cadastrar link
      </button>

      <Row xs={2} md={3} className="g-4">
        {listaLinks == null ? (
          <div>{mensagem}</div>
        ) : (
          <>
            {listaLinks.map((link) => (
              <Col key={link.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={link.imagem}
                    alt={`Foto do link ${link.link}`}
                  />
                  <Card.Body>
                    <Card.Title>{link.tituloLink}</Card.Title>
                    <Card.Text>{link.link}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <NavLink>Informações</NavLink>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </>
        )}
      </Row>

      <Modal
        show={showModalCadastrarLink}
        onHide={handleCloseModalCadastrarLink}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            Cadastro de Link na Bio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="imagem">
                Tipo de Link
              </Form.Label>
              <Form.Select>
                <option value="0" selected disabled>
                  Selecione um tipo
                </option>
                <option value="1">Externo</option>
                <option value="2">Instagram</option>
                <option value="2">TikTok</option>
                <option value="2">LinkedIn</option>
                <option value="3">GitHub</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="imagem">
                Imagem
              </Form.Label>
              <Form.Control
                id="imagem"
                type="file"
                onChange={(e) => setImagem(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="tituloLink">
                Título do Link
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Meu Site Pessoal"
                autoFocus
                id="tituloLink"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="link">
                Link
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="https://meusitepessoal.com"
                id="link"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalCadastrarLink}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleCloseModalCadastrarLink}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
