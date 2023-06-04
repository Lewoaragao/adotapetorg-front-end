import { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormLabel,
  InputGroup,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";
import {
  LINK_TIPO_FACEBOOK,
  LINK_TIPO_GITHUB,
  LINK_TIPO_INSTAGRAM,
  LINK_TIPO_LINKEDIN,
  LINK_TIPO_TIK_TOK,
  LINK_TIPO_YOUTUBE,
} from "../../components/Constantes";
import TituloPagina from "../../components/TituloPagina";
import Mensagem from "../../components/mensagem/Mensagem";
import { AuthContext } from "../../contexts/AuthContext";
import Api from "../../services/Api";
import { formataLink } from "../../utils/Mask";
import Carregamento from "./../../components/Carregamento";

/**
 * Listar Links do usuário logado
 * para que ele possa atualizá-los
 * @since 26/05/2023 22:40:09
 * @author Leonardo Aragão
 */
export default function LinkMeus() {
  const { token, usuarioLogado } = useContext(AuthContext);
  const [tipoLink, setTipoLink] = useState(0);
  const [imagem, setImagem] = useState("");
  const [tituloLink, setTituloLink] = useState("");
  const [desabilitarTituloLink, setDesabilitarTituloLink] = useState(true);
  const [linkPlaceholder, setLinkPlaceholder] = useState("meu-site.com.br");
  const [link, setLink] = useState("");
  const [linkId, setLinkId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [msg, setMsg] = useState("");
  const [msgModal, setMsgModal] = useState("");
  const [msgTipo, setMsgTipo] = useState("");
  const [listaLinkTipos, setListaLinkTipos] = useState([]);
  const [listaLinks, setListaLinks] = useState([]);
  const [abrirModalCadastrarLink, setAbrirModalCadastrarLink] = useState(false);
  const [abrirModalEditarLink, setAbrirModalEditarLink] = useState(false);

  const handleFecharModalCadastrarLink = () =>
    setAbrirModalCadastrarLink(false);

  const handleFecharModalEditarLink = () => setAbrirModalEditarLink(false);

  const handleSelectTipoLinkChange = (e) => {
    setTipoLink(e.target.value);

    const valueSelectedInteger = parseInt(e.target.value);

    switch (valueSelectedInteger) {
      case LINK_TIPO_INSTAGRAM:
        setTituloLink("Instagram");
        setLinkPlaceholder("instagram.com/seu-usuario");
        break;
      case LINK_TIPO_TIK_TOK:
        setTituloLink("TikTok");
        setLinkPlaceholder("instagram.com/seu-usuario");
        break;
      case LINK_TIPO_LINKEDIN:
        setTituloLink("LinkedIn");
        setLinkPlaceholder("linkedin.com/in/seu-usuario");
        break;
      case LINK_TIPO_GITHUB:
        setTituloLink("GitHub");
        setLinkPlaceholder("github.com/seu-usuario");
        break;
      case LINK_TIPO_FACEBOOK:
        setTituloLink("Facebook");
        setLinkPlaceholder("facebook.com/seu-usuario");
        break;
      case LINK_TIPO_YOUTUBE:
        setTituloLink("YouTube");
        setLinkPlaceholder("youtube.com/@seu-usuario");
        break;
      default:
        setDesabilitarTituloLink(false);
        setTituloLink("");
        setLinkPlaceholder("meu-site.com.br");
        break;
    }
  };
  const handleFileImagemChange = (e) => {
    setImagem(e.target.files[0]);
  };

  useEffect(() => {
    listarLinksUsuarioLogado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarLinksUsuarioLogado() {
    setIsLoading(true);
    Api.get(`links/${usuarioLogado.usuario}`)
      .then(({ data }) => {
        setListaLinks(data.user_links);
        setListaLinkTipos(data.link_tipos);
      })
      .catch(({ response }) => {
        setListaLinks(null);
        setListaLinkTipos(response.data.link_tipos);
        setMensagem(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function validaCampos() {
    setMsgTipo("warning");

    if (tipoLink === 0) {
      setMsgModal("Escolha o tipo de link");
      return false;
    }

    if (tituloLink === "" || tituloLink === null) {
      setMsgModal("Preencha o campo título do link");
      return false;
    }

    if (link === "" || link === null) {
      setMsgModal("Preencha o campo link");
      return false;
    }

    return true;
  }

  function cadastrarLink(e) {
    e.preventDefault();
    setMsg("");
    setMsgModal("");

    if (validaCampos()) {
      setIsLoading(true);
      Api.post(
        "links",
        {
          link_tipo_id: tipoLink,
          imagem: imagem,
          titulo_link: tituloLink,
          link: link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then(({ data }) => {
          setMsgTipo("success");
          setMsg(data.message);
          limparCampos();
        })
        .catch(({ response }) => {
          setMsgTipo("warning");
          setMsgModal(response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
          listarLinksUsuarioLogado();
        });
    }
  }

  function editarLink(linkId) {
    setMsg("");
    setMsgModal("");

    if (validaCampos()) {
      setIsLoading(true);
      Api.post(
        `links/atualizar/${linkId}`,
        {
          link_tipo_id: tipoLink,
          imagem: imagem,
          titulo_link: tituloLink,
          link: link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then(({ data }) => {
          setMsgTipo("success");
          setMsg(data.message);
          limparCampos();
        })
        .catch(({ response }) => {
          setMsgTipo("danger");
          setMsgModal(response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
          listarLinksUsuarioLogado();
        });
    }
  }

  function limparCampos() {
    setTipoLink("");
    setImagem("");
    setTituloLink("");
    setLink("");
    setMsgModal("");
    handleFecharModalCadastrarLink();
    handleFecharModalEditarLink();
  }

  function setarLink(e) {
    var linkAux = e.target.value;

    if (linkAux.includes("https://")) {
      linkAux = linkAux.replace("https://", "");
    } else if (linkAux.includes("http://")) {
      linkAux = linkAux.replace("http://", "");
    }

    const linkCompleto = "http://" + linkAux;

    setLink(linkCompleto);
  }

  function deletarLink(linkId) {
    setMsg("");

    setIsLoading(true);
    Api.post(`links/deletar/${linkId}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(({ data }) => {
        setMsgTipo("success");
        setMsg(data.message);
        limparCampos();
      })
      .catch(({ response }) => {
        setMsgTipo("danger");
        setMsg(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
        listarLinksUsuarioLogado();
      });
  }

  function visualizarLink(link) {
    setMsg("");
    setMsgModal("");

    setLinkId(link.id);
    setTipoLink(link.link_tipo_id);
    setTituloLink(link.titulo_link);
    setImagem(link.imagem);
    setLink(link.link);

    setAbrirModalEditarLink(true);
  }

  function copiarLinkUsuarioLogado() {
    navigator.clipboard.writeText(usuarioLogado.link);
    setMsgTipo("success");
    setMsg("Link copiado");
  }

  return (
    <>
      <TituloPagina titulo="Meus Links na Bio" />
      {isLoading ? (
        <Carregamento />
      ) : (
        <>
          <Col md={6}>
            <FormLabel className="fw-bold">Link para compartilhar: </FormLabel>
          </Col>
          <Col md={6}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder={usuarioLogado.link}
                readOnly
                disabled
              />
              <Button
                variant="outline-secondary"
                onClick={copiarLinkUsuarioLogado}
              >
                <BsClipboardCheck /> Copiar
              </Button>
            </InputGroup>
          </Col>

          <button
            className="btn btn-warning d-flex justify-content-center align-items-center gap-1 mb-3"
            onClick={() => setAbrirModalCadastrarLink(true)}
          >
            <AiOutlinePlus /> Cadastrar link
          </button>

          <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

          <ListGroup>
            {listaLinks == null ? (
              <div>{mensagem}</div>
            ) : (
              <>
                {listaLinks.map((link) => (
                  <ListGroup.Item
                    as="li"
                    className="d-flex align-items-start"
                    action
                    variant="dark"
                    key={link.id}
                  >
                    <div className="my-auto">
                      {link.imagem === "" ? (
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
                        {formataLink(link.link)} <GoLinkExternal />
                      </a>
                    </div>

                    <ButtonGroup className="ms-auto my-auto">
                      <Button
                        variant="primary"
                        onClick={() => visualizarLink(link)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deletarLink(link.id)}
                      >
                        Deletar
                      </Button>
                    </ButtonGroup>
                  </ListGroup.Item>
                ))}
              </>
            )}
          </ListGroup>

          {/* MODAL CADASTRAR LINK */}
          <Modal
            show={abrirModalCadastrarLink}
            onHide={handleFecharModalCadastrarLink}
          >
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold text-primary">
                Cadastro de Link na Bio
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Mensagem mensagem={msgModal} mensagemTipo={msgTipo} />
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
                    <option value="0" className="fw-bold">
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
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="imagem">
                    Imagem
                  </Form.Label>
                  <Form.Control
                    id="imagem"
                    type="file"
                    onChange={handleFileImagemChange}
                  />
                </Form.Group>
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
                    disabled={desabilitarTituloLink}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="linkEdit">
                    Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={linkPlaceholder}
                    id="linkEdit"
                    onChange={setarLink}
                    value={link}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={limparCampos}>
                Cancelar
              </Button>
              <Button variant="success" onClick={cadastrarLink}>
                Cadastrar
              </Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL EDITAR LINK */}
          <Modal
            show={abrirModalEditarLink}
            onHide={handleFecharModalEditarLink}
          >
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold text-primary">
                Editar Link na Bio
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Mensagem mensagem={msgModal} mensagemTipo={msgTipo} />
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="tipoLinkEdit">
                    Tipo de Link
                  </Form.Label>
                  <Form.Select
                    onChange={handleSelectTipoLinkChange}
                    value={tipoLink}
                    id="tipoLinkEdit"
                  >
                    <option value="0" className="fw-bold">
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
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="imagemEdit">
                    Imagem
                  </Form.Label>
                  <Form.Control
                    id="imagemEdit"
                    type="file"
                    onChange={handleFileImagemChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="tituloLinkEdit">
                    Título do Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Meu Site Pessoal"
                    autoFocus
                    id="tituloLinkEdit"
                    onChange={(e) => setTituloLink(e.target.value)}
                    value={tituloLink}
                    disabled={desabilitarTituloLink}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold" htmlFor="linkEdit">
                    Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={linkPlaceholder}
                    id="linkEdit"
                    onChange={setarLink}
                    value={link}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={limparCampos}>
                Cancelar
              </Button>
              <Button variant="success" onClick={() => editarLink(linkId)}>
                Editar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
