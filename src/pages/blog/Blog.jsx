import { Card, Col, Row } from "react-bootstrap";
import TituloPagina from "./../../components/TituloPagina";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { useEffect, useState } from "react";
import Api from "../../services/Api";
import { CarregamentoListaPet } from "../../components/Carregamento";

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
  const [mensagem, setMensagem] = useState(false);

  useEffect(() => {
    listarTodasPostagens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarTodasPostagens() {
    Api.get(`blog/todas/postagens`)
      .then(({ data }) => {
        setListaPostagens(data);
      })
      .catch(({ response }) => {
        setMensagem(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <TituloPagina titulo="Blog" />

      <div className="mb-3">
        {isLoading ? (
          <CarregamentoListaPet />
        ) : (
          <>
            {listaPostagens == null ? (
              <div>{mensagem}</div>
            ) : (
              <>
                <h2>Blog: Postagens</h2>
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
      </div>
    </>
  );
}
