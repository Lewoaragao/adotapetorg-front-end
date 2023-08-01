import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormLabel,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsClipboardCheck, BsPencil, BsTrash } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";
import { CarregamentoBotao } from "../../components/Carregamento";
import {
  LINK_TIPO_EXTERNO,
  LINK_TIPO_FACEBOOK,
  LINK_TIPO_GITHUB,
  LINK_TIPO_INSTAGRAM,
  LINK_TIPO_LINKEDIN,
  LINK_TIPO_SELECIONE_UM_LINK,
  LINK_TIPO_TIK_TOK,
  LINK_TIPO_YOUTUBE,
  MENSAGEM_NENHUM_LINK_CADASTRADO,
  TIPO_SUCESSO,
} from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { separarLinkEUsuario, verificaLista } from "../../utils/Util";
import { formataLink } from "../../utils/Mask";
import { GrConfigure } from "react-icons/gr";

/**
 * Listar Links do usuário logado
 * para que ele possa atualizá-los
 * @since 26/05/2023 22:40:09
 * @author Leonardo Aragão
 */
export default function LinkMeus() {
  const { token, usuarioLogado } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);
  const [tipoLink, setTipoLink] = useState(0);
  const [imagem, setImagem] = useState("");
  const [tituloLink, setTituloLink] = useState("");
  const [linkPlaceholder, setLinkPlaceholder] = useState("meu-site.com.br");
  const [link, setLink] = useState("");
  const [idLink, setIdLink] = useState(0);
  const [usuario, setUsuario] = useState("");
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [listaLinkTipos, setListaLinkTipos] = useState([]);
  const [listaLinks, setListaLinks] = useState([]);
  const [nomeBotao, setNomeBotao] = useState("");
  const [desabilitaTituloELink, setDesabilitaTituloELink] = useState(false);
  const [abrirModalEditarImagem, setAbrirModalEditarImagem] = useState(false);
  const [abrirModalCadastrarEditarLink, setAbrirModalCadastrarEditarLink] =
    useState(false);

  const handleSelectTipoLinkChange = (e) => {
    setTipoLink(e.target.value);

    const valueSelectedInteger = parseInt(e.target.value);

    switch (valueSelectedInteger) {
      case LINK_TIPO_INSTAGRAM:
        setTituloLink("Instagram");
        setLink("instagram.com/");
        setLinkPlaceholder("instagram.com/");
        setDesabilitaTituloELink(true);
        setUsuario("");
        break;
      case LINK_TIPO_TIK_TOK:
        setTituloLink("TikTok");
        setLink("tiktok.com/@");
        setLinkPlaceholder("tiktok.com/@");
        setDesabilitaTituloELink(true);
        setUsuario("");
        break;
      case LINK_TIPO_LINKEDIN:
        setTituloLink("LinkedIn");
        setLink("linkedin.com/in/");
        setLinkPlaceholder("linkedin.com/in/");
        setDesabilitaTituloELink(true);
        setUsuario("");
        break;
      case LINK_TIPO_GITHUB:
        setTituloLink("GitHub");
        setLink("github.com/");
        setLinkPlaceholder("github.com/");
        setDesabilitaTituloELink(true);
        setUsuario("");
        break;
      case LINK_TIPO_FACEBOOK:
        setTituloLink("Facebook");
        setLink("facebook.com/");
        setLinkPlaceholder("facebook.com/");
        setDesabilitaTituloELink(true);
        setUsuario("");
        break;
      case LINK_TIPO_YOUTUBE:
        setTituloLink("YouTube");
        setLink("youtube.com/@");
        setLinkPlaceholder("youtube.com/@");
        setDesabilitaTituloELink(true);
        setUsuario("");
        break;
      default:
        setTituloLink("");
        setLink("");
        setLinkPlaceholder("meu-site.com.br");
        setDesabilitaTituloELink(false);
        setUsuario("");
        break;
    }
  };

  useEffect(() => {
    listarLinksUsuarioLogado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarLinksUsuarioLogado() {
    setIsLoadingButton(true);
    Api.get(`links/${usuarioLogado.usuario}`)
      .then(({ data }) => {
        setListaLinks(data.user_links);
        setListaLinkTipos(data.link_tipos);
      })
      .catch(({ response }) => {
        setListaLinks(null);
        setListaLinkTipos(response.data.link_tipos);
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingButton(false);
        limparCampos();
      });
  }

  function validaCampos() {
    if (tipoLink === 0) {
      setarMensagem("Escolha o tipo de link", null);
      return false;
    }

    if (tituloLink === "" || tituloLink === null) {
      setarMensagem("Preencha o campo título do link", null);
      return false;
    }

    if (link === "" || link === null) {
      setarMensagem("Preencha o campo link", null);
      return false;
    }

    return true;
  }

  function cadastrarEditarLink(e) {
    e.preventDefault();

    if (validaCampos()) {
      setIsLoadingButton(true);
      Api.post(
        modoEditar ? `links/atualizar/${idLink}` : "links",
        {
          link_tipo_id: tipoLink,
          titulo_link: tituloLink,
          link: `http://${formataLink(link)}${usuario}`,
          imagem: !modoEditar ? imagem : null,
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
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          listarLinksUsuarioLogado();
        });
    }
  }

  function limparCampos() {
    setTipoLink(0);
    setImagem("");
    setUsuario("");
    setTituloLink("");
    setLink("");
    setModoEditar(false);
    setDesabilitaTituloELink(true);
    setLinkPlaceholder("meu-site.com.br");
    setAbrirModalCadastrarEditarLink(false);
    setAbrirModalEditarImagem(false);
  }

  function setarLink(e) {
    let linkAux = e.target.value;

    if (linkAux.includes("https://")) {
      linkAux = linkAux.replace("https://", "");
    } else if (linkAux.includes("http://")) {
      linkAux = linkAux.replace("http://", "");
    }

    const linkCompleto = "http://" + linkAux;
    setLink(linkCompleto);
  }

  function deletarLink(idLink) {
    setIsLoadingButton(true);
    window.scrollTo(0, 0);

    Api.post(`links/deletar/${idLink}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setarMensagem(data.message, TIPO_SUCESSO);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingButton(false);
        listarLinksUsuarioLogado();
      });
  }

  function removerImagemLink(idLink) {
    setIsLoadingButton(true);
    window.scrollTo(0, 0);

    Api.post(`links/deletar/imagem/${idLink}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setarMensagem(data.message, TIPO_SUCESSO);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingButton(false);
        listarLinksUsuarioLogado();
      });
  }

  function visualizarEditarLink(link) {
    setNomeBotao("Editar");
    setModoEditar(true);
    setIdLink(link.id);
    setTipoLink(link.link_tipo_id);
    setTituloLink(link.titulo_link);
    setImagem(link.imagem);
    setLink(link.link);

    if (link.link_tipo_id !== LINK_TIPO_EXTERNO) {
      const { pLink, pUsuario } = separarLinkEUsuario(link.link);
      setLink(pLink);
      setUsuario(pUsuario);
      setDesabilitaTituloELink(true);
    } else {
      setDesabilitaTituloELink(false);
    }

    setAbrirModalCadastrarEditarLink(true);
  }

  function copiarLinkUsuarioLogado() {
    navigator.clipboard.writeText(usuarioLogado.link);
    setarMensagem("Link copiado", TIPO_SUCESSO);
  }

  function visualizarCadastrarLink() {
    limparCampos();
    setNomeBotao("Cadastrar");
    setAbrirModalCadastrarEditarLink(true);
  }

  function validaCamposAtualizaImagem() {
    if (imagem === "" || imagem === null) {
      setarMensagem("Selecione uma imagem", null);
      return false;
    }

    return true;
  }

  function editarImagem() {
    window.scrollTo(0, 0);

    if (validaCamposAtualizaImagem()) {
      setIsLoadingButton(true);
      Api.post(
        `links/atualizar/imagem/${idLink}`,
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
          listarLinksUsuarioLogado();
        });
    }
  }

  return (
    <>
      <TituloPagina titulo="Meus Links na Bio" />

      <Col md={6}>
        <FormLabel className="fw-bold">Link para compartilhar: </FormLabel>
      </Col>
      <Col md={6}>
        <InputGroup className="mb-3">
          <Form.Control placeholder={usuarioLogado.link} readOnly disabled />
          <Button variant="outline-secondary" onClick={copiarLinkUsuarioLogado}>
            <BsClipboardCheck /> Copiar
          </Button>
        </InputGroup>
      </Col>

      <Button
        className="fw-bold mb-3"
        variant="warning"
        onClick={visualizarCadastrarLink}
      >
        <AiOutlinePlus /> Cadastrar link
      </Button>

      <ListGroup>
        {verificaLista(listaLinks) ? (
          <div className="mb-3">{MENSAGEM_NENHUM_LINK_CADASTRADO}</div>
        ) : (
          <>
            {listaLinks.map((link) => (
              <ListGroup.Item
                as="li"
                className="d-flex align-items-start flex-wrap"
                action
                key={link.id}
              >
                <div className="my-auto">
                  {link.imagem === null ? (
                    <div style={{ width: "40px", height: "40px" }}></div>
                  ) : (
                    <img
                      className="rounded"
                      width="40px"
                      height="40px"
                      src={process.env.REACT_APP_API_URL + link.imagem}
                      alt={`Foto do link: ${link.titulo_link}`}
                    />
                  )}
                </div>

                <div className="ms-3">
                  <div className="fw-bold">{link.titulo_link}</div>
                  <a
                    className="text-reset text-underline-hover"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={link.link}
                  >
                    <GoLinkExternal /> {formataLink(link.link)}
                  </a>
                </div>

                <div className="ms-auto my-auto">
                  <Dropdown>
                    <Dropdown.Toggle className="btn btn-light d-flex justify-content-center align-items-center gap-1">
                      <GrConfigure /> Ações
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Button
                        className="dropdown-item"
                        onClick={() => {
                          visualizarEditarLink(link);
                        }}
                      >
                        <BsPencil /> Editar Link
                      </Button>

                      <Button
                        className="dropdown-item"
                        onClick={() => {
                          let result = window.confirm(
                            "Confirma a ação DELETAR LINK?"
                          );
                          if (result) deletarLink(link.id);
                        }}
                      >
                        <BsTrash /> Deletar Link
                      </Button>

                      <Button
                        className="dropdown-item"
                        onClick={() => {
                          setImagem("");
                          setIdLink(link.id);
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
                          if (result) removerImagemLink(link.id);
                        }}
                      >
                        <BsTrash /> Remover Imagem
                      </Button>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </ListGroup.Item>
            ))}
          </>
        )}
      </ListGroup>

      {/* MODAL CADASTRAR EDITAR LINK */}
      <Modal show={abrirModalCadastrarEditarLink} onHide={limparCampos}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            {modoEditar ? "Editar" : "Cadastro"} Link na Bio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold" htmlFor="tipoLink">
                Tipo de Link
              </Form.Label>
              <Form.Select
                onChange={handleSelectTipoLinkChange}
                value={tipoLink}
                id="tipoLink"
              >
                <option value="0" className="fw-bold" disabled>
                  Selecione um tipo
                </option>

                {listaLinkTipos.map((linkTipo) => (
                  <option
                    key={linkTipo.id}
                    value={linkTipo.id}
                    name={linkTipo.tipo}
                  >
                    {linkTipo.tipo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {!desabilitaTituloELink && (
              <>
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
                  <Form.Label className="fw-bold" htmlFor="tituloLink">
                    Título do Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Meu Site Pessoal"
                    autoFocus
                    id="tituloLink"
                    onChange={(e) => setTituloLink(e.target.value)}
                    value={tituloLink}
                    disabled={desabilitaTituloELink}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="linkEdit">
                    Link
                  </Form.Label>
                  <Form.Control
                    type="url"
                    placeholder={linkPlaceholder}
                    id="linkEdit"
                    onChange={setarLink}
                    value={formataLink(link)}
                    disabled={desabilitaTituloELink}
                    autoComplete="false"
                  />
                </Form.Group>
              </>
            )}

            {desabilitaTituloELink &&
              tipoLink !== LINK_TIPO_SELECIONE_UM_LINK && (
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="usuario">
                    Usuário
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Seu usuário da rede social selecionada"
                    id="usuario"
                    onChange={(e) => setUsuario(e.target.value)}
                    value={usuario}
                  />
                </Form.Group>
              )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={limparCampos}>
            Cancelar
          </Button>
          <Button variant="success" onClick={cadastrarEditarLink}>
            {isLoadingButton ? <CarregamentoBotao variant="dark" /> : nomeBotao}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL PARA EDITAR IMAGEM LINK */}
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
