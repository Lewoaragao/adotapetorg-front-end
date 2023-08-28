import { useContext, useEffect, useState } from "react";
import { Pagination, Row } from "react-bootstrap";
import { CarregamentoLista } from "../../components/Carregamento";
import {
  MENSAGEM_NENHUM_PET_CADASTRADO,
  PRIMEIRA_PAGINA,
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
  const [dataPet, setDataPet] = useState([]);
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
        setDataPet(data);
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
            dataPet.total >= REGISTROS_PAGINACAO && (
              <Row className="mt-3">
                <Pagination className="d-flex justify-content-center align-items-center">
                  {/* BOTÃO DE VOLTAR PARA A PRIMEIRA PÁGINA */}
                  <Pagination.First
                    disabled={dataPet.current_page === PRIMEIRA_PAGINA}
                    onClick={() => listarTodosPets(dataPet.first_page)}
                  />

                  {/* BOTÃO DE VOLTAR PARA A PÁGINA */}
                  <Pagination.Prev
                    disabled={dataPet.current_page === PRIMEIRA_PAGINA}
                    onClick={() => listarTodosPets(dataPet.current_page - 1)}
                  />

                  {/* PARA MOSTRAR QUE EXISTE MAIS PÁGINA ANTERIORES */}
                  {dataPet.current_page > 2 && <Pagination.Ellipsis disabled />}

                  {/* PÁGINA ATUAL MENOS UM */}
                  {dataPet.current_page >= 2 && (
                    <Pagination.Item
                      onClick={() => listarTodosPets(dataPet.current_page - 1)}
                    >
                      {dataPet.current_page - 1}
                    </Pagination.Item>
                  )}

                  {/* PÁGINA ATUAL */}
                  <Pagination.Item active>
                    {dataPet.current_page}
                  </Pagination.Item>

                  {/* PÁGINA ATUAL MAIS UM */}
                  {dataPet.current_page + 1 <= dataPet.last_page && (
                    <Pagination.Item
                      onClick={() => listarTodosPets(dataPet.current_page + 1)}
                    >
                      {dataPet.current_page + 1}
                    </Pagination.Item>
                  )}

                  {/* PARA MOSTRAR QUE EXISTE MAIS PRÓXIMAS PÁGINAS */}
                  {dataPet.current_page + 1 < dataPet.last_page && (
                    <Pagination.Ellipsis disabled />
                  )}

                  {/* BOTÃO DE IR PARA A PRÓXIMA PÁGINA */}
                  <Pagination.Next
                    onClick={() => listarTodosPets(dataPet.current_page + 1)}
                  />

                  {/* BOTÃO DE IR PARA A ÚLTIMA PÁGINA */}
                  <Pagination.Last
                    disabled={dataPet.current_page === dataPet.last_page}
                    onClick={() => listarTodosPets(dataPet.last_page)}
                  />
                </Pagination>
              </Row>
            )}
        </>
      )}
    </>
  );
}
