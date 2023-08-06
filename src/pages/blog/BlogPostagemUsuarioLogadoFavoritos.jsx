import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import {
  CarregamentoBotao,
  CarregamentoLista,
} from "../../components/Carregamento";
import { MENSAGEM_NENHUMA_POSTAGEM_FAVORITADA } from "../../components/Constantes";
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

  useEffect(() => {
    listarPostagensFavoritasUsuarioLogado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarPostagensFavoritasUsuarioLogado() {
    setIsLoading(true);

    Api.post("blog/postagens/favoritas/user", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
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
    Api.post(`blog/${idPostagem}/desfavoritar`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
              </>
            )}
          </>
        )}
      </>
    </>
  );
}
