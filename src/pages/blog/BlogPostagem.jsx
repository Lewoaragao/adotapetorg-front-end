import { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import {
  BsCalendarEvent,
  BsPersonBoundingBox,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import CarregamentoTela, {
  CarregamentoBotao,
} from "../../components/Carregamento";
import BlogPostagemConteudo from "../../components/blogPostagemConteudo/BlogPostagemConteudo";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { formataDataDDMMYYYY } from "../../utils/Mask";
import TituloPagina from "./../../components/TituloPagina";
import { AuthContext } from "../../contexts/AuthContext";

/**
 * Aqui será a pagina dedicada
 * a uma postagem que o usuário
 * deseja ler por completa
 * @since 26/06/2023 11:13:35
 * @author Leonardo Aragão
 */
export default function BlogPostagem() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { token, isUsuarioLogado } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);
  const [postagem, setPostagem] = useState([]);
  const [postagemFavoritada, setPostagemFavoritada] = useState(false);
  const [autor, setAutor] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  useEffect(() => {
    isUsuarioLogado ? verPostagemUserAuth(slug, token) : verPostagem(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function verPostagem(slug) {
    setIsLoading(true);
    Api.get(`blog/${slug}`)
      .then(({ data }) => {
        setPostagem(data.postagem);
        setAutor(data.autor);
        setTags(data.tags);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
        navigate("/erro404");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function verPostagemUserAuth(slug) {
    setIsLoading(true);
    Api.post(`blog/${slug}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setPostagem(data.postagem);
        setAutor(data.autor);
        setTags(data.tags);
        setPostagemFavoritada(data.postagem_favoritada);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
        navigate("/erro404");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function favoritarPostagem(idPostagem) {
    setIsLoadingButton(true);
    Api.post(`blog/${idPostagem}/favoritar`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setPostagemFavoritada(true);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  function desfavoritarPostagem(idPostagem) {
    setIsLoadingButton(true);
    Api.post(`blog/${idPostagem}/desfavoritar`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setPostagemFavoritada(false);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  return (
    <div className="mx-auto" style={{ maxWidth: "600px" }}>
      <TituloPagina titulo={postagem.titulo == null ? "" : postagem.titulo} />
      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <>
          <h4 className="uppercase-first-letter">{postagem.subtitulo}</h4>
          <p className="text-muted d-flex gap-3">
            <span className="d-flex justify-content-center align-items-center gap-1">
              <BsPersonBoundingBox /> {autor}
            </span>
            <span className="d-flex justify-content-center align-items-center gap-1">
              <BsCalendarEvent /> {formataDataDDMMYYYY(postagem.created_at)}
            </span>

            {postagemFavoritada ? (
              <button
                className="btn btn-warning"
                disabled={!isUsuarioLogado || isLoadingButton}
                onClick={() => desfavoritarPostagem(postagem.id)}
              >
                {isLoadingButton ? (
                  <CarregamentoBotao variant="dark" />
                ) : (
                  <BsStarFill />
                )}
              </button>
            ) : (
              <button
                className="btn btn-warning"
                disabled={!isUsuarioLogado || isLoadingButton}
                onClick={() => favoritarPostagem(postagem.id)}
              >
                {isLoadingButton ? (
                  <CarregamentoBotao variant="dark" />
                ) : (
                  <BsStar />
                )}
              </button>
            )}
          </p>

          <Row className="mb-3">
            <img
              className="img-thumbnail"
              src={process.env.REACT_APP_API_URL + postagem.imagem}
              alt={`foto principal da postagem ${postagem.titulo}`}
            />
          </Row>

          <Row className="mb-3 px-3">
            <BlogPostagemConteudo
              html={postagem.conteudo}
              className="uppercase-first-letter"
            />
          </Row>

          <Row className="mb-3">
            <span className="d-flex gap-3 text-muted">
              {tags == null || tags.length === 0 ? (
                <div>Nenhum tag cadastrada</div>
              ) : (
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <FaTags />
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="badge bg-primary text-uppercase"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              )}
            </span>
          </Row>
        </>
      )}
    </div>
  );
}
