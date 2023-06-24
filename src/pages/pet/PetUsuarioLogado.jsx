import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { CarregamentoListaPet } from "../../components/Carregamento";
import TituloPagina from "../../components/TituloPagina";
import Mensagem from "../../components/mensagem/Mensagem";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";

export default function PetUsuarioLogado() {
  const { token } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listaPets, setListaPets] = useState([]);
  const [msgModal, setMsgModal] = useState("");
  const [abrirModalCadastrarPet, setAbrirModalCadastrarPet] = useState(false);

  const handleFecharModalCadastrarPet = () => setAbrirModalCadastrarPet(false);

  useEffect(() => {
    listarPetsUsuarioLogado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarPetsUsuarioLogado() {
    setIsLoading(true);
    Api.post("pets/cadastrados/user", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setListaPets(data.data);
      })
      .catch(({ response }) => {
        setListaPets(null);
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function limparCampos() {
    setMsgModal("");
    handleFecharModalCadastrarPet();
  }

  return (
    <>
      {isLoading ? (
        <CarregamentoListaPet />
      ) : (
        <>
          <TituloPagina titulo="Meus Pets" />

          <button
            className="btn btn-warning d-flex justify-content-center align-items-center gap-1 mb-3 fw-bold"
            onClick={() => setAbrirModalCadastrarPet(true)}
          >
            <AiOutlinePlus /> Cadastrar pet
          </button>

          <Row xs={2} md={3} className="g-4">
            {listaPets == null ? (
              <div>Nenhum pet cadastrado</div>
            ) : (
              <>
                {listaPets.map((pet) => (
                  <Col key={pet.id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={process.env.REACT_APP_API_URL + pet.imagem}
                        alt={`Foto do pet ${pet.nome}`}
                      />
                      <Card.Body>
                        <Card.Title>{pet.nome}</Card.Title>
                        <Card.Text>{pet.raca}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <NavLinkToTop to={`/informacoes/pet/${pet.id}`}>
                          Informações
                        </NavLinkToTop>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Row>

          {/* MODAL CADASTRAR LINK */}
          <Modal
            show={abrirModalCadastrarPet}
            onHide={handleFecharModalCadastrarPet}
          >
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold text-primary">
                Cadastro de Pet
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Mensagem mensagem={msgModal} mensagemTipo="warning" />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="raca">
                    Raça
                  </Form.Label>
                  {/* <Form.Select
                    onChange={handleSelectRaca}
                    value={raca}
                    id="raca"
                  >
                    <option value="0" className="fw-bold">
                      Selecione um tipo
                    </option>

                    {listaRacas.map((raca) => (
                      <option
                        key={raca.id}
                        value={raca.id}
                        name={raca.raca}
                      >
                        {raca.raca}
                      </option>
                    ))}
                  </Form.Select> */}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="imagem">
                    Imagem
                  </Form.Label>
                  <Form.Control
                    id="imagem"
                    type="file"
                    // onChange={handleFileImagemChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="nome">
                    Nome
                  </Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder="Meu Site Pessoal"
                    autoFocus
                    id="nome"
                    onChange={(e) => setTituloLink(e.target.value)}
                    value={tituloLink}
                    disabled={desabilitarTituloLink}
                  /> */}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="obs">
                    Observação
                  </Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder={linkPlaceholder}
                    id="obs"
                    onChange={setarLink}
                    value={link}
                  /> */}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={limparCampos}>
                Cancelar
              </Button>
              {/* <Button variant="success" onClick={cadastrarLink}>
                Cadastrar
              </Button> */}
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
