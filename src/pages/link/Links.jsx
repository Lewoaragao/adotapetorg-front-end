import { useContext, useEffect, useState } from "react";
import { Col, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CarregamentoTela from "../../components/Carregamento";
import TituloPagina from "../../components/TituloPagina";
import { MessageContext } from "../../contexts/MessageContext";
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
  const [userImagem, setUserImagem] = useState("");
  const [flgUserCadastrado, setFlgUserCadastrado] = useState(false);
  const { setarMensagem } = useContext(MessageContext);

  useEffect(() => {
    listarLinksUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarLinksUsuario() {
    setIsLoading(true);
    Api.get(`links/${nomeUsuario}`)
      .then(({ data }) => {
        setListaLinks(data.user_links);
        setFlgUserCadastrado(data.flg_user_cadastrado);
        verificaUserImagem(data.user_imagem);
      })
      .catch(({ response }) => {
        setListaLinks(null);
        setUserImagem(response.data.user_imagem);
        setFlgUserCadastrado(response.data.flg_user_cadastrado);
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function verificaUserImagem(userImagem) {
    let result = userImagem.includes("https");

    if (result) {
      setUserImagem(userImagem);
    } else {
      let result =
        userImagem === "" || userImagem === null || !flgUserCadastrado;

      if (result) {
        setUserImagem(logo);
      } else {
        setUserImagem(process.env.REACT_APP_API_URL + userImagem);
      }
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 ">
      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <div
          style={{ maxWidth: "350px" }}
          className="vw-100 my-auto"
          align="center"
        >
          <img
            src={userImagem}
            width="100"
            height="100"
            className="d-inline-block align-top rounded-circle mt-3"
            alt="logo adota pet org"
          />

          <TituloPagina titulo={nomeUsuario} />

          <Col>
            {!flgUserCadastrado && (
              <>
                <p>Nenhum usuário cadastraro com esse nome</p>
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
            {listaLinks !== null && (
              <Col className="">
                {listaLinks.map((link) => (
                  <a
                    key={link.id}
                    className="text-decoration-none"
                    href={link.link}
                  >
                    <ListGroup.Item
                      action
                      className="btn btn-light d-flex justify-content-start align-items-center gap-3 mb-3"
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
              href={process.env.REACT_APP_PUBLIC_URL}
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
