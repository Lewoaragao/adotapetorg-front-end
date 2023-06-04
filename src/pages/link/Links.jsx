import { useEffect, useState } from "react";
import { Col, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Carregamento from "../../components/Carregamento";
import TituloPagina from "../../components/TituloPagina";
import Mensagem from "../../components/mensagem/Mensagem";
import logo from "../../images/logo-adotapetorg.jpg";
import Api from "../../services/Api";
import NavLinkToTop from "./../../components/navLinkToTop/NavLinkToTop";

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
        setUserImagem(response.data.user_imagem);
        setFlgUserCadastrado(response.data.flg_user_cadastrado);
        setMensagem(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 ">
      {isLoading ? (
        <Carregamento />
      ) : (
        <div className="vw-100 my-auto" align="center">
          <img
            src={
              userImagem === "" || userImagem === null || !flgUserCadastrado
                ? logo
                : process.env.REACT_APP_API_URL + userImagem
            }
            width="100"
            height="100"
            className="d-inline-block align-top rounded-circle mt-3"
            alt="logo adota pet org"
          />

          <TituloPagina titulo={nomeUsuario} />

          <Col lg={4}>
            <Mensagem mensagem={mensagem} mensagemTipo={msgTipo} />
            {!flgUserCadastrado && (
              <>
                <p>
                  Quer se cadastrar com esse usuário?{" "}
                  <NavLinkToTop
                    className="text-underline-hover"
                    to="/cadastrar/usuario"
                  >
                    Clique aqui
                  </NavLinkToTop>
                </p>
              </>
            )}
          </Col>

          <ListGroup>
            {listaLinks != null && (
              <Col xs={12} sm={8} md={6} className="mx-auto">
                {listaLinks.map((link) => (
                  <a className="text-decoration-none" href={link.link}>
                    <ListGroup.Item
                      action
                      variant="primary"
                      className="d-flex justify-content-start align-items-center gap-3 mb-3"
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
                      <span>{link.titulo_link}</span>
                    </ListGroup.Item>
                  </a>
                ))}
              </Col>
            )}
          </ListGroup>

          <div className="mb-3">
            <a
              className="text-reset text-underline-hover d-flex justify-content-center align-items-center gap-1 small"
              target="_blank"
              rel="noopener noreferrer"
              href="https://adotapet.org"
            >
              <img
                className="rounded"
                width="25px"
                height="25px"
                src={logo}
                alt="logo adota pet org"
              />
              <span className="fw-bold"> Adota Pet Org</span>
            </a>
          </div>
        </div>
      )}
    </Container>
  );
}
