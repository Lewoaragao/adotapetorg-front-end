import { Card, Col, Row } from "react-bootstrap";
import TituloPagina from "./../../components/TituloPagina";

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
  return (
    <>
      <TituloPagina titulo="Blog" />

      <div className="mb-3">
        <h2>Blog: Postagens recentes</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  10 Motivos pelos quais Adotar um Pet vai Transformar sua Vida!
                </Card.Title>
                <Card.Text>
                  Descubra as razões emocionantes pelas quais adotar um pet pode
                  trazer alegria, companheirismo e amor incondicional para sua
                  vida.
                </Card.Text>
              </Card.Body>
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  Conheça os Pets mais Adoráveis que Estão Aguardando por um Lar
                </Card.Title>
                <Card.Text>
                  Apresentamos alguns dos pets mais adoráveis e carismáticos que
                  estão esperando para serem adotados. Prepare-se para se
                  apaixonar!
                </Card.Text>
              </Card.Body>
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
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
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
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
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  Adote um Pet Mais Velho: A Beleza da Maturidade
                </Card.Title>
                <Card.Text>
                  Saiba por que adotar um pet mais velho pode trazer uma conexão
                  profunda e gratificante, além de oferecer uma nova chance para
                  animais mais experientes.
                </Card.Text>
              </Card.Body>
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
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
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  Adotar um Pet: Um Atode Amor que Salva Vidas
                </Card.Title>
                <Card.Text>
                  Explore como a adoção de um pet não apenas muda a vida do
                  animal, mas também oferece uma nova chance e salva vidas.
                </Card.Text>
              </Card.Body>
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
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
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Pets e Crianças: A Dupla Perfeita</Card.Title>
                <Card.Text>
                  Descubra como a convivência com pets pode ser benéfica para o
                  desenvolvimento emocional, social e responsável das crianças.
                </Card.Text>
              </Card.Body>
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  Dicas para Adoção de um Gatinho: Tudo o que Você Precisa Saber
                </Card.Title>
                <Card.Text>
                  Conheça as principais orientações para adotar um gatinho,
                  incluindo cuidados, socialização e como garantir o bem-estar
                  do novo felino em sua casa.
                </Card.Text>
              </Card.Body>
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
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
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  Animais Exóticos como Pets: Descubra o Fascínio da Diversidade
                </Card.Title>
                <Card.Text>
                  Explore o mundo dos animais exóticos como pets e descubra as
                  considerações especiais e os cuidados necessários para
                  proporcionar uma vida feliz e saudável a esses animais únicos.
                </Card.Text>
              </Card.Body>
              <Card.Footer>Ler mais</Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
