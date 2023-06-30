import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CarregamentoLista } from "../../components/Carregamento";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import TituloPagina from "../../components/TituloPagina";
import { AuthContext } from "../../contexts/AuthContext";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { MENSAGEM_NENHUMA_POSTAGEM_FAVORITADA } from "../../components/Constantes";

/**
 * Aqui será a pagina dedicada
 * a uma postagem que o usuário
 * deseja ler por completa
 * @since 26/06/2023 11:13:35
 * @author Leonardo Aragão
 */
export default function BlogPostagemUsuarioLogadoFavoritos() {
  const { slug } = useParams();
  const { setarMensagem } = useContext(MessageContext);
  const { token } = useContext(AuthContext);
  const [listaPostagens, setListaPostagens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    verPostagem(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function verPostagem(slug) {
    setIsLoading(true);

    Api.post("blog/postagens/favoritas/user", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        console.log(data);
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

  return (
    <>
      <TituloPagina titulo="Minhas postagens favoritas" />

      <>
        {isLoading ? (
          <CarregamentoLista />
        ) : (
          <>
            {listaPostagens == null ? (
              <div className="mb-3">{MENSAGEM_NENHUMA_POSTAGEM_FAVORITADA}</div>
            ) : (
              <>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                  <>
                    {listaPostagens.map((postagem) => (
                      <Col key={postagem.id}>
                        <Card>
                          <Card.Img
                            variant="top"
                            src={
                              process.env.REACT_APP_API_URL + postagem.imagem
                            }
                            alt={`foto principal da postagem ${postagem.titulo}`}
                          />
                          <Card.Body>
                            <Card.Title>{postagem.titulo}</Card.Title>
                            <Card.Text>{postagem.subtitulo}</Card.Text>
                          </Card.Body>
                          <Card.Footer>
                            <NavLinkToTop
                              to={`/blog/postagem/${postagem.slug}`}
                            >
                              Ler mais
                            </NavLinkToTop>
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
