import { useContext, useEffect, useState } from "react";
import { Pagination, Row } from "react-bootstrap";
import { CarregamentoLista } from "../../components/Carregamento";
import {
  MENSAGEM_NENHUMA_POSTAGEM_CADASTRADA,
  PRIMEIRA_PAGINA,
  REGISTROS_PAGINACAO,
} from "../../components/Constantes";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import TituloPagina from "../../components/TituloPagina";
import { verificaLista } from "../../utils/Util";
import CardPostagem from "../../components/cardPostagem/CardPostagem";

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
export default function BlogTodasPostagens() {
  const [listaPostagens, setListaPostagens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataPostagem, setDataPostagem] = useState([]);
  const { setarMensagem } = useContext(MessageContext);

  useEffect(() => {
    listarTodasPostagens(PRIMEIRA_PAGINA);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarTodasPostagens(numeroPaginaPostagem) {
    setIsLoading(true);

    Api.get(`blog/todas/postagens?page=${numeroPaginaPostagem}`)
      .then(({ data }) => {
        setDataPostagem(data);
        setListaPostagens(data.data);
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
                      <CardPostagem key={postagem.id} postagem={postagem} />
                    ))}
                  </>
                </Row>

                {dataPostagem.total >= REGISTROS_PAGINACAO && (
                  <Row className="my-3">
                    <Pagination className="d-flex justify-content-center align-items-center">
                      {/* BOTÃO DE VOLTAR PARA A PRIMEIRA PÁGINA */}
                      <Pagination.First
                        disabled={dataPostagem.current_page === PRIMEIRA_PAGINA}
                        onClick={() =>
                          listarTodasPostagens(dataPostagem.first_page)
                        }
                      />

                      {/* BOTÃO DE VOLTAR PARA A PÁGINA */}
                      <Pagination.Prev
                        disabled={dataPostagem.current_page === PRIMEIRA_PAGINA}
                        onClick={() =>
                          listarTodasPostagens(dataPostagem.current_page - 1)
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
                            listarTodasPostagens(dataPostagem.current_page - 1)
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
                            listarTodasPostagens(dataPostagem.current_page + 1)
                          }
                        >
                          {dataPostagem.current_page + 1}
                        </Pagination.Item>
                      )}

                      {/* PARA MOSTRAR QUE EXISTE MAIS PRÓXIMAS PÁGINAS */}
                      {dataPostagem.current_page + 1 <
                        dataPostagem.last_page && (
                        <Pagination.Ellipsis disabled />
                      )}

                      {/* BOTÃO DE IR PARA A PRÓXIMA PÁGINA */}
                      <Pagination.Next
                        onClick={() =>
                          listarTodasPostagens(dataPostagem.current_page + 1)
                        }
                      />

                      {/* BOTÃO DE IR PARA A ÚLTIMA PÁGINA */}
                      <Pagination.Last
                        onClick={() =>
                          listarTodasPostagens(dataPostagem.last_page)
                        }
                      />
                    </Pagination>
                  </Row>
                )}
              </>
            )}
          </>
        )}
      </>
    </>
  );
}
