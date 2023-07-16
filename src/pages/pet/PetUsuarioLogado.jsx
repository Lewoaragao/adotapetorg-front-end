import { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPencil, BsTrash } from "react-icons/bs";
import { CarregamentoLista } from "../../components/Carregamento";
import {
  MENSAGEM_NENHUM_PET_CADASTRADO,
  MENSAGEM_TIPO_SUCESSO,
} from "../../components/Constantes";
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
  const [listaPetTipos, setListaPetTipos] = useState([]);
  const [listaRacas, setListaRacas] = useState([]);
  const [msgModal, setMsgModal] = useState("");
  const [abrirModalCadastrarPet, setAbrirModalCadastrarPet] = useState(false);
  // const [abrirModalEditarPet, setAbrirModalEditarPet] = useState(false);

  const handleFecharModalCadastrarPet = () => limparCampos();
  const handleFecharModalEditarPet = () => limparCampos();

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
        setListaPets(data.pets.data);
        setListaPetTipos(data.tipos);
        setListaRacas(data.racas);
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
    handleFecharModalEditarPet();
  }

  function deletarPet(idPet) {
    setIsLoading(true);
    Api.post(`pets/deletar/${idPet}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setarMensagem(data.message, MENSAGEM_TIPO_SUCESSO);
        limparCampos();
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        listarPetsUsuarioLogado();
      });
  }

  function listarRacas(idPetTipo) {
    Api.post(`pets/racas/${idPetTipo}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setListaRacas(data);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {});
  }

  return (
    <>
      <TituloPagina titulo="Meus Pets" />

      <button
        className="btn btn-warning d-flex justify-content-center align-items-center gap-1 mb-3 fw-bold"
        onClick={() => setAbrirModalCadastrarPet(true)}
      >
        <AiOutlinePlus /> Cadastrar pet
      </button>

      {isLoading ? (
        <CarregamentoLista />
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {listaPets == null ? (
              <div className="mb-3">{MENSAGEM_NENHUM_PET_CADASTRADO}</div>
            ) : (
              <>
                {listaPets.map((pet) => (
                  <Col key={pet.id}>
                    <Card>
                      <div className="image-container">
                        <Card.Img
                          variant="top"
                          src={process.env.REACT_APP_API_URL + pet.imagem}
                          alt={`Foto do pet ${pet.nome}`}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title>{pet.nome}</Card.Title>
                        <Card.Text>{pet.raca}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="d-flex justify-content-between align-items-center">
                        <div>
                          <NavLinkToTop to={`/informacoes/pet/${pet.id}`}>
                            Informações
                          </NavLinkToTop>
                        </div>

                        <div>
                          <ButtonGroup className="ms-auto my-auto">
                            <Button
                              variant="outline-primary"
                              // onClick={() => visualizarEditarPet(pet)}
                            >
                              <BsPencil />
                            </Button>
                            <Button
                              variant="outline-danger"
                              onClick={() => deletarPet(pet.id)}
                            >
                              <BsTrash />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Row>

          {/* MODAL CADASTRAR PET */}
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
