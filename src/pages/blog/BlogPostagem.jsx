import { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { BsCalendarEvent, BsPersonBoundingBox } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import CarregamentoTela from "../../components/Carregamento";
import BlogPostagemConteudo from "../../components/blogPostagemConteudo/BlogPostagemConteudo";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import { formataDataDDMMYYYY } from "../../utils/Mask";
import TituloPagina from "./../../components/TituloPagina";

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
  const { setarMensagem } = useContext(MessageContext);
  const [postagem, setPostagem] = useState([]);
  const [autor, setAutor] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    verPostagem(slug);
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

  return (
    <>
      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          <TituloPagina titulo={postagem.titulo} />
          <h4>{postagem.subtitulo}</h4>
          <p className="text-muted d-flex gap-3">
            <span className="d-flex justify-content-center align-items-center gap-1">
              <BsPersonBoundingBox /> {autor}
            </span>
            <span className="d-flex justify-content-center align-items-center gap-1">
              <BsCalendarEvent /> {formataDataDDMMYYYY(postagem.created_at)}
            </span>
          </p>

          <Row className="mb-3">
            <img
              className="img-thumbnail"
              src={process.env.REACT_APP_API_URL + postagem.imagem}
              alt={`foto principal da postagem ${postagem.titulo}`}
            />
          </Row>

          <Row className="mb-3 px-3">
            <BlogPostagemConteudo html={postagem.conteudo} />
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
        </div>
      )}
    </>
  );
}
