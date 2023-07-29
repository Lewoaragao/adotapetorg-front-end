import { useContext, useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { CarregamentoLista } from "../../components/Carregamento";
import { MENSAGEM_NENHUM_PET_CADASTRADO } from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { verificaListaNulaVazia } from "../../utils/Util";

export default function PetTodos() {
  const [isLoading, setIsLoading] = useState(false);
  const [listaPets, setListaPets] = useState([]);
  const [data, setData] = useState([]);
  const { setarMensagem } = useContext(MessageContext);
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
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <TituloPagina titulo="Todos os Pets" />

      {isLoading ? (
        <CarregamentoLista />
      ) : (
        <>
          {verificaListaNulaVazia(listaPets) ? (
            <div className="mb-3">{MENSAGEM_NENHUM_PET_CADASTRADO}</div>
          ) : (
            <>
              <Row xs={1} sm={2} md={3} lg={4} className="g-4">
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
                        <Card.Footer>
                          <NavLinkToTop to={`/informacoes/pet/${pet.id}`}>
                            Informações
                          </NavLinkToTop>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </>
              </Row>
            </>
          )}

          {!verificaListaNulaVazia(listaPets) && (
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
                <Pagination.Item active>{data.current_page}</Pagination.Item>

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
  );
}
