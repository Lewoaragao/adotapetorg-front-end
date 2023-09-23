import { useContext, useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import {
  CarregamentoBotao,
  CarregamentoLista,
} from "../../components/Carregamento";
import {
  MENSAGEM_NENHUMA_POSTAGEM_FAVORITADA,
  PRIMEIRA_PAGINA,
} from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { verificaLista } from "../../utils/Util";
import { AiOutlineInfoCircle } from "react-icons/ai";

/**
 * Aqui será a pagina dedicada
 * a uma postagem que o usuário
 * deseja ler por completa
 * @since 26/06/2023 11:13:35
 * @author Leonardo Aragão
 */
export default function BlogPostagemUsuarioLogadoFavoritos() {
  const { setarMensagem } = useContext(MessageContext);
  const { token } = useContext(AuthContext);
  const [listaPostagens, setListaPostagens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [dataPostagem, setDataPostagem] = useState([]);

  useEffect(() => {
    listarPostagensFavoritasUsuarioLogado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function listarPostagensFavoritasUsuarioLogado(numeroPaginaPostagem) {
    setIsLoading(true);

    const endpoint = `blog/postagens/favoritas/user?page=${numeroPaginaPostagem}`;

    Api.get(endpoint, header)
      .then(({ data }) => {
        setDataPostagem(data);
        setListaPostagens(data.data);
      })
      .catch(({ response }) => {
        setListaPostagens(null);
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function desfavoritarPostagem(idPostagem) {
    setIsLoadingButton(true);
    Api.post(`blog/${idPostagem}/desfavoritar`, null, header)
      .then(() => {
        listarPostagensFavoritasUsuarioLogado();
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
      <TituloPagina titulo="Minhas postagens favoritas" />

      <>
        {isLoading ? (
          <CarregamentoLista />
        ) : (
          <>
            {verificaLista(listaPostagens) ? (
              <div className="mb-3">{MENSAGEM_NENHUMA_POSTAGEM_FAVORITADA}</div>
            ) : (
              <>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  <>
                    {listaPostagens.map((postagem) => (
                      <Col key={postagem.id}>
                        <Card>
                          <div className="image-container">
                            <Card.Img
                              variant="top"
                              src={
                                process.env.REACT_APP_API_URL + postagem.imagem
                              }
                              alt={`foto principal da postagem ${postagem.titulo}`}
                            />
                          </div>
                          <Card.Body>
                            <Card.Title>{postagem.titulo}</Card.Title>
                            <Card.Text>{postagem.subtitulo}</Card.Text>
                          </Card.Body>
                          <Card.Footer className="d-flex justify-content-between align-items-center">
                            <div>
                              <NavLinkToTop
                                className="btn btn-primary d-flex justify-content-center align-items-center gap-1"
                                to={`/blog/postagem/${postagem.slug}`}
                              >
                                <AiOutlineInfoCircle /> Ler
                              </NavLinkToTop>
                            </div>

                            <div>
                              <button
                                className="btn btn-warning"
                                onClick={() =>
                                  desfavoritarPostagem(postagem.id)
                                }
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
                </Row>

                <Row className="my-3">
                  <Pagination className="d-flex justify-content-center align-items-center">
                    {/* BOTÃO DE VOLTAR PARA A PRIMEIRA PÁGINA */}
                    <Pagination.First
                      disabled={dataPostagem.current_page === PRIMEIRA_PAGINA}
                      onClick={() =>
                        listarPostagensFavoritasUsuarioLogado(
                          dataPostagem.first_page
                        )
                      }
                    />

                    {/* BOTÃO DE VOLTAR PARA A PÁGINA */}
                    <Pagination.Prev
                      disabled={dataPostagem.current_page === PRIMEIRA_PAGINA}
                      onClick={() =>
                        listarPostagensFavoritasUsuarioLogado(
                          dataPostagem.current_page - 1
                        )
                      }
                    />

                    {/* PARA MOSTRAR QUE EXISTE MAIS PÁGINA ANTERIORES */}
                    {dataPostagem.current_page > 2 && (
                      <Pagination.Ellipsis disabled />
                    )}

                    {/* PÁGINA ATUAL MENOS UM */}
                    {dataPostagem.current_page >= 2 && (
                      <Pagination.Item
                        onClick={() =>
                          listarPostagensFavoritasUsuarioLogado(
                            dataPostagem.current_page - 1
                          )
                        }
                      >
                        {dataPostagem.current_page - 1}
                      </Pagination.Item>
                    )}

                    {/* PÁGINA ATUAL */}
                    <Pagination.Item active>
                      {dataPostagem.current_page}
                    </Pagination.Item>

                    {/* PÁGINA ATUAL MAIS UM */}
                    {dataPostagem.current_page + 1 <=
                      dataPostagem.last_page && (
                      <Pagination.Item
                        onClick={() =>
                          listarPostagensFavoritasUsuarioLogado(
                            dataPostagem.current_page + 1
                          )
                        }
                      >
                        {dataPostagem.current_page + 1}
                      </Pagination.Item>
                    )}

                    {/* PARA MOSTRAR QUE EXISTE MAIS PRÓXIMAS PÁGINAS */}
                    {dataPostagem.current_page + 1 < dataPostagem.last_page && (
                      <Pagination.Ellipsis disabled />
                    )}

                    {/* BOTÃO DE IR PARA A PRÓXIMA PÁGINA */}
                    <Pagination.Next
                      disabled={
                        dataPostagem.current_page === dataPostagem.last_page
                      }
                      onClick={() =>
                        listarPostagensFavoritasUsuarioLogado(
                          dataPostagem.current_page + 1
                        )
                      }
                    />

                    {/* BOTÃO DE IR PARA A ÚLTIMA PÁGINA */}
                    <Pagination.Last
                      disabled={
                        dataPostagem.current_page === dataPostagem.last_page
                      }
                      onClick={() =>
                        listarPostagensFavoritasUsuarioLogado(
                          dataPostagem.last_page
                        )
                      }
                    />
                  </Pagination>
                </Row>
              </>
            )}
          </>
        )}
      </>
    </>
  );
}
