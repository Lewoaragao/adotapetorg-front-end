import { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { CarregamentoLista } from "../../components/Carregamento";
import { MENSAGEM_NENHUMA_POSTAGEM_CADASTRADA } from "../../components/Constantes";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import TituloPagina from "./../../components/TituloPagina";
import { verificaLista } from "../../utils/Util";

/**
 * Aqui será a pagina geral do blog
 * contendo postagens diversas,
 * separadas por categorias,
 * como postagens recentes,
 * adoção, castração, cuidados...
 * entre outros, onde terá um botão
 * de ler mais em cada postagem
 * redirecionando para a página correta,
 * feita especialmente para aquela postagem.
 * @since 24/06/2023 11:47:50
 * @author Leonardo Aragão
 */
export default function Blog() {
  const [listaPostagens, setListaPostagens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setarMensagem } = useContext(MessageContext);

  useEffect(() => {
    listarTodasPostagens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarTodasPostagens() {
    Api.get(`blog/todas/postagens`)
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

  return (
    <>
      <TituloPagina titulo="Blog" />

      <>
        {isLoading ? (
          <CarregamentoLista />
        ) : (
          <>
            {verificaLista(listaPostagens) ? (
              <div className="mb-3">{MENSAGEM_NENHUMA_POSTAGEM_CADASTRADA}</div>
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
