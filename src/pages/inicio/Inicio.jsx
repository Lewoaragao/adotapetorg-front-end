import { useEffect, useState } from "react";
import { Card, Col, Pagination, Row } from "react-bootstrap";
import { TbAlertTriangle } from "react-icons/tb";
import { CarregamentoListaPet } from "../../components/Carregamento";
import Api from "../../services/Api";
import TituloPagina from "./../../components/TituloPagina";
import NavLinkToTop from "./../../components/navLinkToTop/NavLinkToTop";
import placeholderBlog from "../../images/placeholder-blog.jpg";

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
      <div className="container vw-100">
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

        <div className="mb-3">
          <h2>Blog: Postagens recentes</h2>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    10 Motivos pelos quais Adotar um Pet vai Transformar sua
                    Vida!
                  </Card.Title>
                  <Card.Text>
                    Descubra as razões emocionantes pelas quais adotar um pet
                    pode trazer alegria, companheirismo e amor incondicional
                    para sua vida.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Conheça os Pets mais Adoráveis que Estão Aguardando por um
                    Lar
                  </Card.Title>
                  <Card.Text>
                    Apresentamos alguns dos pets mais adoráveis e carismáticos
                    que estão esperando para serem adotados. Prepare-se para se
                    apaixonar!
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Adoção Responsável: Como Encontrar o Pet Perfeito para sua
                    Família
                  </Card.Title>
                  <Card.Text>
                    Explore dicas práticas para encontrar o pet perfeito que se
                    encaixe no estilo de vida e necessidades da sua família,
                    garantindo uma adoção bem-sucedida.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Pets com Necessidades Especiais: Amor sem Limites!
                  </Card.Title>
                  <Card.Text>
                    Descubra histórias inspiradoras de pets com necessidades
                    especiais que encontraram lares amorosos e veja como eles
                    podem trazer alegria e superação para sua vida.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Adote um Pet Mais Velho: A Beleza da Maturidade
                  </Card.Title>
                  <Card.Text>
                    Saiba por que adotar um pet mais velho pode trazer uma
                    conexão profunda e gratificante, além de oferecer uma nova
                    chance para animais mais experientes.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Como se Preparar para a Chegada do seu Novo Amigo de Quatro
                    Patas
                  </Card.Title>
                  <Card.Text>
                    Aprenda dicas essenciais para preparar sua casa e sua vida
                    para a chegada do novo membro da família, garantindo uma
                    transição tranquila.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Adotar um Pet: Um Atode Amor que Salva Vidas
                  </Card.Title>
                  <Card.Text>
                    Explore como a adoção de um pet não apenas muda a vida do
                    animal, mas também oferece uma nova chance e salva vidas.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Fotos de Antes e Depois: Transformações Incríveis após a
                    Adoção
                  </Card.Title>
                  <Card.Text>
                    Veja fotos emocionantes que mostram a incrível transformação
                    física e emocional de pets após serem adotados, mostrando o
                    poder do amor e cuidado.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>Pets e Crianças: A Dupla Perfeita</Card.Title>
                  <Card.Text>
                    Descubra como a convivência com pets pode ser benéfica para
                    o desenvolvimento emocional, social e responsável das
                    crianças.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Dicas para Adoção de um Gatinho: Tudo o que Você Precisa
                    Saber
                  </Card.Title>
                  <Card.Text>
                    Conheça as principais orientações para adotar um gatinho,
                    incluindo cuidados, socialização e como garantir o bem-estar
                    do novo felino em sua casa.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Dicas para Adoção de um Cãozinho: Prepare-se para sua Nova
                    Aventur
                  </Card.Title>
                  <Card.Text>
                    Descubra as melhores dicas para adotar um cãozinho, desde a
                    escolha da raça até a preparação do ambiente e o treinamento
                    inicial.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={placeholderBlog}
                  alt={`teste imagem postagem blog`}
                />
                <Card.Body>
                  <Card.Title>
                    Animais Exóticos como Pets: Descubra o Fascínio da
                    Diversidade
                  </Card.Title>
                  <Card.Text>
                    Explore o mundo dos animais exóticos como pets e descubra as
                    considerações especiais e os cuidados necessários para
                    proporcionar uma vida feliz e saudável a esses animais
                    únicos.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <NavLinkToTop to={`/blog/teste-titulo`}>
                    Ler mais
                  </NavLinkToTop>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>

        <>
          {isLoading ? (
            <CarregamentoListaPet />
          ) : (
            <>
              <h2>Lista: Pets</h2>
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

              {listaPets !== null && listaPets.length > 0 && (
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
