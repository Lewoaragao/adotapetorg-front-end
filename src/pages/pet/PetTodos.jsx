import { useContext, useEffect, useState } from "react";
import { Pagination, Row } from "react-bootstrap";
import { CarregamentoLista } from "../../components/Carregamento";
import {
  MENSAGEM_NENHUM_PET_CADASTRADO,
  REGISTROS_PAGINACAO,
} from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { verificaLista } from "../../utils/Util";
import CardPet from "./../../components/cardPet/CardPet";

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
          {verificaLista(listaPets) ? (
            <div className="mb-3">{MENSAGEM_NENHUM_PET_CADASTRADO}</div>
          ) : (
            <>
              <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                <>
                  {listaPets.map((pet) => (
                    <CardPet key={pet.id} pet={pet} />
                  ))}
                </>
              </Row>
            </>
          )}

          {!verificaLista(listaPets) &&
            listaPets.length > REGISTROS_PAGINACAO && (
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
