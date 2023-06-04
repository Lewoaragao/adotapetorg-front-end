import { useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import Carregamento from "../../components/Carregamento";
import Api from "../../services/Api";
import TituloPagina from "./../../components/TituloPagina";
import NavLinkToTop from "./../../components/navLinkToTop/NavLinkToTop";

function Inicio({ logo }) {
  const [listaPets, setListaPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mensagem, setMensagem] = useState(false);
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    listarTodosPets(pagina);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarTodosPets(numeroPagina) {
    setPagina(numeroPagina);
    setIsLoading(true);
    Api.get(`pets?page=${pagina}`)
      .then(({ data }) => {
        setData(data);
        setListaPets(data.data);
      })
      .catch(({ response }) => {
        setMensagem(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <div className="text-center">
          <img
            src={logo}
            className="rounded-circle"
            width="300px"
            alt="logo adota pet org"
          />

          <TituloPagina titulo="Início" />

          <p className="bg-dark text-warning fs-1 fw-bold rounded mt-2">
            <TbAlertTriangle /> Em desenvolvimento <TbAlertTriangle />
          </p>
          <p>
            <a
              className="nav-link d-inline mx-2 text-underline-hover fs-4"
              href="https://github.com/adotapetorg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              className="nav-link d-inline mx-2 text-underline-hover fs-4"
              href="https://instagram.com/adotapetorg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="nav-link d-inline mx-2 text-underline-hover fs-4"
              href="https://youtube.com/@adotapetorg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Youtube
            </a>
          </p>
        </div>

        <>
          {isLoading ? (
            <Carregamento />
          ) : (
            <>
              <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {listaPets == null ? (
                  <div>{mensagem}</div>
                ) : (
                  <>
                    {listaPets.map((pet) => (
                      <Col key={pet.id}>
                        <Card>
                          <Card.Img
                            variant="top"
                            src={process.env.REACT_APP_API_URL + pet.imagem}
                            alt={`foto pet ${pet.nome}`}
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

              {listaPets != null && (
                <Row className="mt-3">
                  <Pagination className="d-flex justify-content-center align-items-center">
                    {/* BOTÃO DE VOLTAR PARA A PRIMEIRA PÁGINA */}
                    <Pagination.First
                      onClick={() => listarTodosPets(data.first_page)}
                    />

                    {/* BOTÃO DE VOLTAR PARA A PÁGINA */}
                    <Pagination.Prev
                      onClick={() => listarTodosPets(data.current_page - 1)}
                    />

                    {/* PARA MOSTRAR QUE EXISTE MAIS PÁGINA ANTERIORES */}
                    {data.current_page > 2 && <Pagination.Ellipsis disabled />}

                    {/* PÁGINA ATUAL MENOS UM */}
                    {data.current_page >= 2 && (
                      <Pagination.Item
                        onClick={() => listarTodosPets(data.current_page - 1)}
                      >
                        {data.current_page - 1}
                      </Pagination.Item>
                    )}

                    {/* PÁGINA ATUAL */}
                    <Pagination.Item active>
                      {data.current_page}
                    </Pagination.Item>

                    {/* PÁGINA ATUAL MAIS UM */}
                    {data.current_page + 1 <= data.last_page && (
                      <Pagination.Item
                        onClick={() => listarTodosPets(data.current_page + 1)}
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
                      onClick={() => listarTodosPets(data.current_page + 1)}
                    />

                    {/* BOTÃO DE IR PARA A ÚLTIMA PÁGINA */}
                    <Pagination.Last
                      onClick={() => listarTodosPets(data.last_page)}
                    />
                  </Pagination>
                </Row>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}

export default Inicio;
