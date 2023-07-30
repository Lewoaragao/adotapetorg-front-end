import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import {
  CarregamentoBotao,
  CarregamentoLista,
} from "../../components/Carregamento";
import { MENSAGEM_NENHUM_PET_FAVORITADO } from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { verificaLista } from "../../utils/Util";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function PetUsuarioLogadoFavoritos() {
  const { token } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listaPets, setListaPets] = useState([]);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  useEffect(() => {
    listarPetsUsuarioLogadoFavoritos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarPetsUsuarioLogadoFavoritos() {
    setIsLoading(true);
    Api.post("pets/favoritos/user", null, {
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

  function desfavoritarPet(idPet) {
    setIsLoadingButton(true);
    Api.post(`pets/${idPet}/desfavoritar`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        listarPetsUsuarioLogadoFavoritos();
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  return (
    <>
      <TituloPagina titulo="Meus Pets Favoritos" />

      {isLoading ? (
        <CarregamentoLista />
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {verificaLista(listaPets) ? (
              <div className="mb-3">{MENSAGEM_NENHUM_PET_FAVORITADO}</div>
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
                          <NavLinkToTop
                            className="btn btn-primary d-flex justify-content-center align-items-center gap-1"
                            to={`/informacoes/pet/${pet.id}`}
                          >
                            <AiOutlineInfoCircle /> Info
                          </NavLinkToTop>
                        </div>

                        <div>
                          <button
                            className="btn btn-warning"
                            onClick={() => desfavoritarPet(pet.id)}
                          >
                            {isLoadingButton ? (
                              <CarregamentoBotao variant="dark" />
                            ) : (
                              <BsStarFill />
                            )}
                          </button>
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </>
      )}
    </>
  );
}
