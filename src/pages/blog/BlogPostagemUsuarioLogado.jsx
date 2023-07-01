import JoditEditor from "jodit-react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPencil, BsTrash } from "react-icons/bs";
import { CarregamentoLista } from "../../components/Carregamento";
import {
  MENSAGEM_NENHUMA_POSTAGEM_CADASTRADA,
  MENSAGEM_TIPO_SUCESSO,
} from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import Mensagem from "../../components/mensagem/Mensagem";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";

/**
 * Aqui será a pagina dedicada
 * a uma postagem que o usuário
 * deseja ler por completa
 * @since 26/06/2023 11:13:35
 * @author Leonardo Aragão
 */
export default function BlogPostagemUsuarioLogado() {
  const { setarMensagem } = useContext(MessageContext);
  const { token } = useContext(AuthContext);
  const [listaPostagens, setListaPostagens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [msgModal, setMsgModal] = useState("");
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState("");
  const [listaTags, setListaTags] = useState([]);
  const [listaTagsSelecionadas, setListaTagsSelecionadas] = useState([]);
  const [tag, setTag] = useState(0);
  const [abrirModalCadastrarPostagem, setAbrirModalCadastrarPostagem] =
    useState(false);
  const handleSelectTag = (e) => {
    setTag(e.target.value);
  };

  // config editor de texto
  const editor = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {
    readonly: false,
    placeholder: "Comece a escrever sua postagem...",
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "eraser",
      "ul",
      "ol",
      "paragraph",
      "superscript",
      "subscript",
      "speechRecognize",
      "cut",
      "copy",
      "paste",
    ],
    toolbarAdaptive: false,
  };

  const handleFecharModalCadastrarPostagem = () =>
    setAbrirModalCadastrarPostagem(false);

  useEffect(() => {
    listarPostagensUsuarioLogado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addListaTagsSelecionadas() {
    if (tag !== 0 && !listaTagsSelecionadas.includes(tag)) {
      setListaTagsSelecionadas([...listaTagsSelecionadas, tag]);
      setTag(0);
    }
  }

  const removeListaTagsSelecionadas = (tag) => {
    const updatedTags = listaTagsSelecionadas.filter((item) => item !== tag);
    setListaTagsSelecionadas(updatedTags);
  };

  function listarPostagensUsuarioLogado() {
    setIsLoading(true);

    Api.post("blog/postagens/cadastradas/user", null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        console.log(data);
        setListaPostagens(data.postagens.data);
        setListaTags(data.tags);
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

  function validaCampos() {
    if (titulo === "" || titulo === null) {
      setMsgModal("Preencha o campo título");
      return false;
    }

    if (subtitulo === "" || subtitulo === null) {
      setMsgModal("Preencha o campo subtítulo");
      return false;
    }

    if (conteudo === "" || conteudo === null) {
      setMsgModal("Preencha o campo conteúdo da postagem");
      return false;
    }

    return true;
  }

  function limparCampos() {
    setTitulo("");
    setSubtitulo("");
    setConteudo("");
    setMsgModal("");
    setTag(0);
    setListaTagsSelecionadas([]);
    handleFecharModalCadastrarPostagem();
  }

  function cadastrarPostagem() {
    setMsgModal("");
    console.log(tag);

    if (validaCampos()) {
      setIsLoading(true);
      Api.post(
        "blog/cadastrar/postagem",
        {
          titulo: titulo,
          subtitulo: subtitulo,
          conteudo: conteudo,
          imagem: imagem === "" ? null : imagem,
          tags: listaTagsSelecionadas.length > 0 ? listaTagsSelecionadas : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then(({ data }) => {
          setarMensagem(data.message, MENSAGEM_TIPO_SUCESSO);
          limparCampos();
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          listarPostagensUsuarioLogado();
          setIsLoading(false);
        });
    }
  }

  function deletarPostagem(idPostagem) {
    setMsgModal("");

    setIsLoading(true);
    Api.post(`blog/deletar/${idPostagem}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        setarMensagem(data.message, MENSAGEM_TIPO_SUCESSO);
        limparCampos();
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        listarPostagensUsuarioLogado();
        setIsLoading(false);
      });
  }

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
            {listaPostagens === null ? (
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
                          <Card.Footer className="d-flex justify-content-between align-items-center">
                            <div>
                              <NavLinkToTop
                                to={`/blog/postagem/${postagem.slug}`}
                              >
                                Ler mais
                              </NavLinkToTop>
                            </div>

                            <div>
                              <ButtonGroup className="ms-auto my-auto">
                                <Button
                                  variant="outline-primary"
                                  // onClick={() => visualizarEditarPostagem(postagem)}
                                >
                                  <BsPencil />
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => deletarPostagem(postagem.id)}
                                >
                                  <BsTrash />
                                </Button>
                              </ButtonGroup>
                            </div>
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
      <Modal show={abrirModalCadastrarPostagem} onHide={limparCampos}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            Cadastro de Postagem
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Mensagem mensagem={msgModal} mensagemTipo="warning" />

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="titulo">
              Título
            </Form.Label>
            <Form.Control
              id="titulo"
              type="text"
              placeholder="Digite um título"
              value={titulo}
              required
              autoFocus
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="subtitulo">
              Subtítulo
            </Form.Label>
            <Form.Control
              id="subtitulo"
              type="text"
              placeholder="Digite um subtítulo"
              value={subtitulo}
              required
              onChange={(e) => setSubtitulo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="imagem">
              Imagem
            </Form.Label>
            <Form.Control
              id="imagem"
              type="file"
              onChange={(e) => setImagem(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="editor">
              Conteúdo da Postagem
            </Form.Label>
            <JoditEditor
              id="editor"
              ref={editor}
              value={conteudo}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setConteudo(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="tipoLink">
              Tag
            </Form.Label>
            <Form.Select onChange={handleSelectTag} value={tag} id="tag">
              <option value="0" className="fw-bold" disabled>
                Selecione uma tag
              </option>

              {listaTags.map((tag) => (
                <option key={tag.id} value={tag.nome} name={tag.tag}>
                  {tag.tag}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button className="mb-3" onClick={addListaTagsSelecionadas}>
            Adicionar Tag
          </Button>

          {listaTagsSelecionadas.length > 0 && (
            <div className="mb-3">
              {listaTagsSelecionadas.map((tag) => (
                <button
                  type="button"
                  className="btn btn-primary me-1"
                  onClick={() => removeListaTagsSelecionadas(tag)}
                >
                  {tag} <span className="badge">x</span>
                </button>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={limparCampos}>
            Cancelar
          </Button>
          <Button variant="success" onClick={cadastrarPostagem}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
