import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { CarregamentoLista } from "../../components/Carregamento";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import TituloPagina from "../../components/TituloPagina";
import { AuthContext } from "../../contexts/AuthContext";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { MENSAGEM_NENHUMA_POSTAGEM_CADASTRADA } from "../../components/Constantes";
import { AiOutlinePlus } from "react-icons/ai";
import Mensagem from "../../components/mensagem/Mensagem";
import EditorTexto from "../../components/editorTexto/EditorTexto";

/**
 * Aqui será a pagina dedicada
 * a uma postagem que o usuário
 * deseja ler por completa
 * @since 26/06/2023 11:13:35
 * @author Leonardo Aragão
 */
export default function BlogPostagemUsuarioLogado() {
  const { slug } = useParams();
  const { setarMensagem } = useContext(MessageContext);
  const { token } = useContext(AuthContext);
  const [listaPostagens, setListaPostagens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [msgModal, setMsgModal] = useState("");
  const [textoFormatar, setTextoFormatar] = useState("");
  const [abrirModalCadastrarPostagem, setAbrirModalCadastrarPostagem] =
    useState(false);

  const handleFecharModalCadastrarPostagem = () =>
    setAbrirModalCadastrarPostagem(false);

  useEffect(() => {
    verPostagem(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function verPostagem(slug) {
    setIsLoading(true);

    Api.post("blog/postagens/cadastradas/user", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setListaPostagens(data.data);
      })
      .catch(({ response }) => {
        setListaPostagens(null);
        setarMensagem(response.data.message, null);
        setMsgModal(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const getTextoFormatar = (textoFormatar) => {
    setTextoFormatar(textoFormatar);
  };

  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
  };

  return (
    <>
      <TituloPagina titulo="Minhas postagens" />

      <button
        className="btn btn-warning d-flex justify-content-center align-items-center gap-1 mb-3 fw-bold"
        onClick={() => setAbrirModalCadastrarPostagem(true)}
      >
        <AiOutlinePlus /> Cadastrar postagem
      </button>

      <>
        {isLoading ? (
          <CarregamentoLista />
        ) : (
          <>
            {listaPostagens == null ? (
              <div className="mb-3">{MENSAGEM_NENHUMA_POSTAGEM_CADASTRADA}</div>
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

      {/* MODAL CADASTRAR POSTAGEM */}
      <Modal
        show={abrirModalCadastrarPostagem}
        onHide={handleFecharModalCadastrarPostagem}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            Cadastro de Postagem
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Mensagem mensagem={msgModal} mensagemTipo="warning" />
          <Form>
            <EditorTexto initialValue="" getValue={getValue} />
            {value}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleFecharModalCadastrarPostagem}
          >
            Cancelar
          </Button>
          <Button variant="success">Cadastrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
