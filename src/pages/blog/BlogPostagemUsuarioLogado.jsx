import JoditEditor from "jodit-react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Modal,
  Pagination,
  Row,
} from "react-bootstrap";
import { AiOutlineInfoCircle, AiOutlinePlus } from "react-icons/ai";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  CarregamentoBotao,
  CarregamentoLista,
} from "../../components/Carregamento";
import {
  MENSAGEM_NENHUMA_POSTAGEM_CADASTRADA,
  PRIMEIRA_PAGINA,
  REGISTROS_PAGINACAO,
  TELA_EDITAR_PERFIL_USUARIO,
  TIPO_SUCESSO,
} from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { verificaLista } from "../../utils/Util";
import { GrConfigure } from "react-icons/gr";

/**
 * Aqui será a pagina dedicada
 * a uma postagem que o usuário
 * deseja ler por completa
 * @since 26/06/2023 11:13:35
 * @author Leonardo Aragão
 */
export default function BlogPostagemUsuarioLogado() {
  const { setarMensagem } = useContext(MessageContext);
  const { token, usuarioLogado } = useContext(AuthContext);
  const [listaPostagens, setListaPostagens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState("");
  const [listaTags, setListaTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [disabledTags, setDisabledTags] = useState([]);
  const [selectedTagsNomes, setSelectedTagsNomes] = useState([]);
  const [tag, setTag] = useState(0);
  const [idPostagem, setIdPostagem] = useState(0);
  const [nomeBotao, setNomeBotao] = useState("");
  const [dataPostagem, setDataPostagem] = useState([]);
  const [
    abrirModalCadastrarEditarPostagem,
    setAbrirModalCadastrarEditarPostagem,
  ] = useState(false);
  const [abrirModalEditarImagem, setAbrirModalEditarImagem] = useState(false);

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const headerMultipart = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  // config editor de texto
  const editor = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const config = {
    readonly: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "eraser",
      "ul",
      "ol",
      "copyformat",
      "paragraph",
      "superscript",
      "subscript",
      "indent",
      "outdent",
      "cut",
      "copy",
      "paste",
      "undo",
      "redo",
      "table",
      "lineHeight",
      "hr",
      "fullsize",
      "find",
      "preview",
    ],
    toolbarAdaptive: false,
    language: "pt_br",
    style: { font: "18px Arial" },
  };

  useEffect(() => {
    listarPostagensUsuarioLogado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarPostagensUsuarioLogado(numeroPaginaPostagem) {
    setIsLoading(true);

    const endpoint = `blog/postagens/cadastradas/user?page=${numeroPaginaPostagem}`;

    Api.get(endpoint, header)
      .then(({ data }) => {
        setDataPostagem(data.postagens);
        setListaPostagens(data.postagens.data);
        setListaTags(data.tags);
      })
      .catch(({ response }) => {
        setListaPostagens(null);
        setarMensagem(response.data.message, null);
        setListaTags(response.data.tags);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function validaCampos() {
    if (titulo === "" || titulo === null) {
      setarMensagem("Preencha o campo título", null);
      return false;
    }

    if (subtitulo === "" || subtitulo === null) {
      setarMensagem("Preencha o campo subtítulo", null);
      return false;
    }

    if (conteudo === "" || conteudo === null) {
      setarMensagem("Preencha o campo conteúdo da postagem", null);
      return false;
    }

    return true;
  }

  function validaCamposAtualizaImagem() {
    if (imagem === "" || imagem === null) {
      setarMensagem("Selecione uma imagem", null);
      return false;
    }

    return true;
  }

  function limparCampos() {
    setTag(0);

    setTitulo("");
    setSubtitulo("");
    setConteudo("");
    setImagem("");

    setModoEditar(false);
    setAbrirModalCadastrarEditarPostagem(false);
    setAbrirModalEditarImagem(false);

    setSelectedTags([]);
    setDisabledTags([]);
    setSelectedTagsNomes([]);
  }

  function cadastrarEditarPostagem() {
    window.scrollTo(0, 0);

    if (validaCampos()) {
      let request = {
        titulo: titulo,
        subtitulo: subtitulo,
        conteudo: conteudo,
        imagem: imagem,
        tags: selectedTagsNomes.length > 0 ? selectedTagsNomes : null,
      };

      setIsLoadingButton(true);
      Api.post(
        modoEditar
          ? `blog/atualizar/postagem/${idPostagem}`
          : "blog/cadastrar/postagem",
        request,
        headerMultipart
      )
        .then(({ data }) => {
          setarMensagem(data.message, TIPO_SUCESSO);
          limparCampos();
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          listarPostagensUsuarioLogado();
          setIsLoadingButton(false);
        });
    }
  }

  function deletarPostagem(idPostagem) {
    window.scrollTo(0, 0);

    setIsLoading(true);
    Api.post(`blog/deletar/${idPostagem}`, null, header)
      .then(({ data }) => {
        setarMensagem(data.message, TIPO_SUCESSO);
        limparCampos();
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        listarPostagensUsuarioLogado();
      });
  }

  function visualizarEditarPostagem(postagem) {
    setNomeBotao("Editar");
    setModoEditar(true);
    setImagem("");
    setIdPostagem(postagem.id);
    setTitulo(postagem.titulo);
    setSubtitulo(postagem.subtitulo);
    setConteudo(postagem.conteudo);

    let listaTagNomes = [];

    if (postagem.tags != null && postagem.tags.length > 0) {
      listaTagNomes = postagem.tags.map((tag) => tag.tag);
    }

    setSelectedTagsNomes(listaTagNomes);
    setSelectedTags(postagem.tags);
    setDisabledTags(postagem.tags);
    setAbrirModalCadastrarEditarPostagem(true);
  }

  function visualizarCadastrarPostagem() {
    setNomeBotao("Cadastrar");
    setModoEditar(false);
    setAbrirModalCadastrarEditarPostagem(true);
  }

  function editarImagem() {
    window.scrollTo(0, 0);

    if (validaCamposAtualizaImagem()) {
      setIsLoadingButton(true);
      Api.post(
        `blog/atualizar/imagem/${idPostagem}`,
        {
          imagem: imagem,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then(({ data }) => {
          setarMensagem(data.message, TIPO_SUCESSO);
          limparCampos();
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          setIsLoadingButton(false);
          listarPostagensUsuarioLogado();
        });
    }
  }

  function removerImagemPostagem(idPostagem) {
    setIsLoading(true);
    Api.post(`blog/deletar/imagem/${idPostagem}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setarMensagem(data.message, TIPO_SUCESSO);
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

  const handleOptionSelectTag = (event) => {
    const selectedTagId = parseInt(event.target.value, 10);
    const selectedTag = listaTags.find((tag) => tag.id === selectedTagId);

    setSelectedTags([...selectedTags, selectedTag]);
    setDisabledTags([...disabledTags, selectedTag]);
    setSelectedTagsNomes([...selectedTagsNomes, selectedTag.tag]);
  };

  const handleRemoveTag = (tagId) => {
    const updatedSelectedTags = selectedTags.filter((tag) => tag.id !== tagId);
    const updatedDisabledTags = disabledTags.filter((tag) => tag.id !== tagId);

    let listaTagNomes = [];

    if (updatedSelectedTags != null && updatedSelectedTags.length > 0) {
      listaTagNomes = updatedSelectedTags.map((tag) => tag.tag);
    }

    setSelectedTags(updatedSelectedTags);
    setDisabledTags(updatedDisabledTags);
    setSelectedTagsNomes(listaTagNomes);
  };

  return (
    <>
      <TituloPagina titulo="Minhas postagens" />

      {usuarioLogado.celular === null && usuarioLogado.telefone === null && (
        <p>
          Para começar a cadastrar, é necessário completar seu perfil,{" "}
          <NavLinkToTop to={TELA_EDITAR_PERFIL_USUARIO}>
            clicando aqui
          </NavLinkToTop>
          .
        </p>
      )}

      <button
        className={`btn btn-warning d-flex justify-content-center align-items-center gap-1 mb-3 fw-bold ${
          usuarioLogado.celular === null && usuarioLogado.telefone === null
            ? "disabled"
            : ""
        }`}
        onClick={visualizarCadastrarPostagem}
      >
        <AiOutlinePlus /> Cadastrar postagem
      </button>
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
                                className="btn btn-primary d-flex justify-content-center align-items-center gap-1"
                                to={`/blog/postagem/${postagem.slug}`}
                              >
                                <AiOutlineInfoCircle /> Ler
                              </NavLinkToTop>
                            </div>

                            <div>
                              <Dropdown>
                                <Dropdown.Toggle className="btn btn-light d-flex justify-content-center align-items-center gap-1">
                                  <GrConfigure /> Ações
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Button
                                    className="dropdown-item"
                                    onClick={() => {
                                      visualizarEditarPostagem(postagem);
                                    }}
                                  >
                                    <BsPencil /> Editar Postagem
                                  </Button>

                                  <Button
                                    className="dropdown-item"
                                    onClick={() => {
                                      let result = window.confirm(
                                        "Confirma a ação DELETAR POSTAGEM?"
                                      );
                                      if (result) deletarPostagem(postagem.id);
                                    }}
                                  >
                                    <BsTrash /> Deletar Postagem
                                  </Button>

                                  <Button
                                    className="dropdown-item"
                                    onClick={() => {
                                      setImagem("");
                                      setIdPostagem(postagem.id);
                                      setAbrirModalEditarImagem(true);
                                    }}
                                  >
                                    <BsPencil /> Editar Imagem
                                  </Button>

                                  <Button
                                    className="dropdown-item"
                                    onClick={() => {
                                      let result = window.confirm(
                                        "Confirma a ação REMOVER IMAGEM?"
                                      );
                                      if (result)
                                        removerImagemPostagem(postagem.id);
                                    }}
                                  >
                                    <BsTrash /> Remover imagem
                                  </Button>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </>
                </Row>
                {!verificaLista(listaPostagens) &&
                  dataPostagem.total >= REGISTROS_PAGINACAO && (
                    <Row className="my-3">
                      <Pagination className="d-flex justify-content-center align-items-center">
                        {/* BOTÃO DE VOLTAR PARA A PRIMEIRA PÁGINA */}
                        <Pagination.First
                          disabled={
                            dataPostagem.current_page === PRIMEIRA_PAGINA
                          }
                          onClick={() =>
                            listarPostagensUsuarioLogado(
                              dataPostagem.first_page
                            )
                          }
                        />

                        {/* BOTÃO DE VOLTAR PARA A PÁGINA */}
                        <Pagination.Prev
                          disabled={
                            dataPostagem.current_page === PRIMEIRA_PAGINA
                          }
                          onClick={() =>
                            listarPostagensUsuarioLogado(
                              dataPostagem.current_page - 1
                            )
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
                              listarPostagensUsuarioLogado(
                                dataPostagem.current_page - 1
                              )
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
                              listarPostagensUsuarioLogado(
                                dataPostagem.current_page + 1
                              )
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
                          disabled={
                            dataPostagem.current_page === dataPostagem.last_page
                          }
                          onClick={() =>
                            listarPostagensUsuarioLogado(
                              dataPostagem.current_page + 1
                            )
                          }
                        />

                        {/* BOTÃO DE IR PARA A ÚLTIMA PÁGINA */}
                        <Pagination.Last
                          disabled={
                            dataPostagem.current_page === dataPostagem.last_page
                          }
                          onClick={() =>
                            listarPostagensUsuarioLogado(dataPostagem.last_page)
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

      {/* MODAL CADASTRAR EDITAR POSTAGEM */}
      <Modal show={abrirModalCadastrarEditarPostagem} onHide={limparCampos}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            Cadastro de Postagem
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              autoComplete="off"
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
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="tag">
              Tag
            </Form.Label>
            <Form.Select
              className="mb-3"
              onChange={handleOptionSelectTag}
              value={tag}
              id="tag"
            >
              <option value="0" className="fw-bold" disabled>
                Selecione uma ou mais tags
              </option>

              {listaTags.map((tag) => (
                <option
                  key={tag.id}
                  value={tag.id}
                  disabled={disabledTags.some(
                    (disabledTag) => disabledTag.id === tag.id
                  )}
                >
                  {tag.tag}
                </option>
              ))}
            </Form.Select>

            {!verificaLista(selectedTags) && (
              <>
                <Form.Label className="fw-bold" htmlFor="tag">
                  Tags Selecionadas
                </Form.Label>

                <div className="mb-3">
                  {selectedTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      className="btn btn-primary m-1"
                      onClick={() => handleRemoveTag(tag.id)}
                    >
                      {tag.tag} <span className="badge">x</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </Form.Group>

          {!modoEditar && (
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
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="editor">
              Conteúdo da Postagem
            </Form.Label>
            <JoditEditor
              id="editor"
              ref={editor}
              value={conteudo}
              config={config}
              style={{ font: "50px Arial" }}
              // tabIndex da área de texto
              tabIndex={1}
              // preferiu usar apenas esta opção para atualizar o conteúdo por motivos de desempenho
              onBlur={(newContent) => setConteudo(newContent)}
              onChange={(newContent) => {}}
              autoComplete="off"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={limparCampos}>
            Cancelar
          </Button>
          <Button variant="success" onClick={cadastrarEditarPostagem}>
            {isLoadingButton ? <CarregamentoBotao variant="dark" /> : nomeBotao}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL EDITAR IMAGEM POSTAGEM */}
      <Modal show={abrirModalEditarImagem} onHide={limparCampos}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            Atualizar imagem
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={limparCampos}>
            Cancelar
          </Button>
          <Button variant="success" onClick={editarImagem}>
            {isLoadingButton ? <CarregamentoBotao variant="dark" /> : "Editar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
