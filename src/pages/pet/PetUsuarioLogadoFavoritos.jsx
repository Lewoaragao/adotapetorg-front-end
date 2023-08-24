import { useContext, useEffect, useState } from "react";
import { Badge, Card, Col, Pagination, Row } from "react-bootstrap";
import {
  BsCalendarEvent,
  BsGenderFemale,
  BsGenderMale,
  BsStarFill,
} from "react-icons/bs";
import {
  CarregamentoBotao,
  CarregamentoLista,
} from "../../components/Carregamento";
import {
  FALSE_PHP,
  MENSAGEM_NENHUM_PET_FAVORITADO,
  REGISTROS_PAGINACAO,
  TIPO_ALERTA,
  TIPO_SUCESSO,
} from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { verificaLista } from "../../utils/Util";
import { AiFillIdcard, AiOutlineInfoCircle } from "react-icons/ai";
import {
  formataMostrandoIdade,
  formataPrimeiroNome,
  formataSexoPet,
  formataTamanhoPet,
} from "../../utils/Mask";
import { RxSize } from "react-icons/rx";

export default function PetUsuarioLogadoFavoritos() {
  const { token } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listaPets, setListaPets] = useState([]);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    listarPetsUsuarioLogadoFavoritos(pagina);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarPetsUsuarioLogadoFavoritos(numeroPagina) {
    setIsLoading(true);
    setPagina(numeroPagina);

    Api.post(`pets/favoritos/user?page=${pagina}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setData(data);
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
                        <Card.Title>
                          {pet.flg_adotado === FALSE_PHP ? (
                            <Badge
                              pill
                              bg={TIPO_ALERTA}
                              className="text-dark mb-2"
                            >
                              Para adoção
                            </Badge>
                          ) : (
                            <Badge
                              pill
                              bg={TIPO_SUCESSO}
                              className="text-dark mb-2"
                            >
                              Adotado
                            </Badge>
                          )}
                          <br />
                          <AiFillIdcard /> {formataPrimeiroNome(pet.nome)}{" "}
                          {pet.apelido !== null && `(${pet.apelido})`}
                        </Card.Title>
                        <Card.Text>
                          <RxSize /> {formataTamanhoPet(pet.tamanho, pet.sexo)}{" "}
                          <br />
                          <span
                            className={
                              pet.sexo === "M" ? "text-primary" : "text-danger"
                            }
                          >
                            {pet.sexo === "M" ? (
                              <BsGenderMale />
                            ) : (
                              <BsGenderFemale />
                            )}{" "}
                            {formataSexoPet(pet.sexo)}
                          </span>{" "}
                          <br />
                          <BsCalendarEvent />{" "}
                          {formataMostrandoIdade(pet.data_nascimento)} <br />
                        </Card.Text>
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

          {!verificaLista(listaPets) &&
            listaPets.length > REGISTROS_PAGINACAO && (
              <Row className="mt-3">
                <Pagination className="d-flex justify-content-center align-items-center">
                  {/* BOTÃO DE VOLTAR PARA A PRIMEIRA PÁGINA */}
                  <Pagination.First
                    onClick={() =>
                      listarPetsUsuarioLogadoFavoritos(data.first_page)
                    }
                  />

                  {/* BOTÃO DE VOLTAR PARA A PÁGINA */}
                  <Pagination.Prev
                    onClick={() =>
                      listarPetsUsuarioLogadoFavoritos(data.current_page - 1)
                    }
                  />

                  {/* PARA MOSTRAR QUE EXISTE MAIS PÁGINA ANTERIORES */}
                  {data.current_page > 2 && <Pagination.Ellipsis disabled />}

                  {/* PÁGINA ATUAL MENOS UM */}
                  {data.current_page >= 2 && (
                    <Pagination.Item
                      onClick={() =>
                        listarPetsUsuarioLogadoFavoritos(data.current_page - 1)
                      }
                    >
                      {data.current_page - 1}
                    </Pagination.Item>
                  )}

                  {/* PÁGINA ATUAL */}
                  <Pagination.Item active>{data.current_page}</Pagination.Item>

                  {/* PÁGINA ATUAL MAIS UM */}
                  {data.current_page + 1 <= data.last_page && (
                    <Pagination.Item
                      onClick={() =>
                        listarPetsUsuarioLogadoFavoritos(data.current_page + 1)
                      }
                    >
                      {data.current_page + 1}
                    </Pagination.Item>
                  )}

                  {/* PARA MOSTRAR QUE EXISTE MAIS PRÓXIMAS PÁGINAS */}
                  {data.current_page + 1 < data.last_page && (
                    <Pagination.Ellipsis disabled />
                  )}

                  {/* BOTÃO DE IR PARA A PRÓXIMA PÁGINA */}
                  <Pagination.Next
                    onClick={() =>
                      listarPetsUsuarioLogadoFavoritos(data.current_page + 1)
                    }
                  />

                  {/* BOTÃO DE IR PARA A ÚLTIMA PÁGINA */}
                  <Pagination.Last
                    onClick={() =>
                      listarPetsUsuarioLogadoFavoritos(data.last_page)
                    }
                  />
                </Pagination>
              </Row>
            )}
        </>
      )}
    </>
  );
}
