import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import Carregamento from "../../components/Carregamento";
import LinkItem from "../../components/LinkItem";
import TituloPagina from "../../components/TituloPagina";
import Mensagem from "../../components/mensagem/Mensagem";
import logo from "../../images/logo-adotapetorg.jpg";
import Api from "../../services/Api";

/**
 * Página onde serão exibidos os links
 * cadastrados pelos usuários
 * @since 25/05/2023 23:37:30
 * @author Leonardo Aragão
 */
export default function Links() {
  const { nomeUsuario } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [listaLinks, setListaLinks] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [msgTipo, setMsgTipo] = useState("");
  const [userImagem, setUserImagem] = useState("");
  const [flgUserCadastrado, setFlgUserCadastrado] = useState(false);

  useEffect(() => {
    listarLinksUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarLinksUsuario() {
    setIsLoading(true);
    Api.get(`links/${nomeUsuario}`)
      .then(({ data }) => {
        setListaLinks(data.user_links);
        setUserImagem(data.user_imagem);
        setFlgUserCadastrado(data.flg_user_cadastrado);
      })
      .catch(({ response }) => {
        setListaLinks(null);
        setMsgTipo("warning");
        setFlgUserCadastrado(response.data.flg_user_cadastrado);
        setMensagem(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      {isLoading ? (
        <Carregamento />
      ) : (
        <div className="vw-100" align="center">
          <img
            src={
              userImagem === "" || userImagem === null
                ? logo
                : process.env.REACT_APP_API_URL + userImagem
            }
            width="100"
            height="100"
            className="d-inline-block align-top rounded-circle"
            alt="logo adota pet org"
          />

          <TituloPagina titulo={nomeUsuario} />
          {/* <h2 className="mb-4">um amor sem fronteiras</h2> */}

          <Col lg={4}>
            <Mensagem mensagem={mensagem} mensagemTipo={msgTipo} />
            {!flgUserCadastrado && (
              <>
                <p>
                  Quer se cadastrar com esse usuário?{" "}
                  <NavLink
                    className="text-reset text-underline-hover"
                    to="/cadastrar/usuario"
                  >
                    Clique aqui
                  </NavLink>
                </p>
              </>
            )}
          </Col>

          {listaLinks != null &&
            listaLinks.map((link) => (
              <Col key={link.id} lg={4}>
                <LinkItem
                  className="text-start"
                  titulo={link.titulo_link}
                  url={link.link}
                />
              </Col>
            ))}
        </div>
      )}
    </Container>
  );
}
