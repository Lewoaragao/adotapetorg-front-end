import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import NavLinkToTop from "../../../components/navLinkToTop/NavLinkToTop";
import {
  TELA_BLOG,
  TELA_INICIAL,
  TELA_MEUS_LINKS,
  TELA_POLITICA_PRIVACIDADE,
  TELA_SOBRE,
} from "./../../../components/Constantes";

function Footer({ logo }) {
  const [aposAnoInicio, setAposAnoInicio] = useState(false);

  const anoInicio = 2023;
  const data = new Date();
  const anoAtual = data.getFullYear();

  useEffect(() => {
    if (anoAtual > anoInicio) {
      setAposAnoInicio(true);
    }
  }, [anoInicio, anoAtual]);

  return (
    <footer className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-end align-items-center p-4 border-bottom container">
        <div className="me-3 d-none d-lg-block">
          <span>Conecte-se conosco nas redes sociais:</span>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com/adotapetorg"
          >
            <FaInstagram />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/adotapetorg"
          >
            <FaGithub />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noopener noreferrer"
            href="https://linkedin.com/company/adotapetorg"
          >
            <FaLinkedin />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/adotapetorg"
          >
            <FaTwitter />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noopener noreferrer"
            href="https://facebok.com/adotapetorg"
          >
            <FaFacebook />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noopener noreferrer"
            href="https://youtube.com/@adotapetorg"
          >
            <FaYoutube />
          </a>
        </div>
      </section>

      <section className="container">
        <div className="text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-3">
                <img
                  className="rounded me-3"
                  src={logo}
                  alt="logo adota pet org"
                  width="40px"
                  height="40px"
                />
                {process.env.REACT_APP_SITE_TITLE}
              </h6>
              <p>{process.env.REACT_APP_SITE_DESCRIPTION}</p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Utilidade</h6>
              <p>
                <NavLinkToTop
                  to={TELA_MEUS_LINKS}
                  className="text-reset text-underline-hover"
                >
                  Link na Bio
                </NavLinkToTop>
              </p>
              <p>
                <NavLinkToTop
                  to={TELA_POLITICA_PRIVACIDADE}
                  className="text-reset text-underline-hover"
                >
                  Política de privacidade
                </NavLinkToTop>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Navegação</h6>
              <p>
                <NavLinkToTop
                  to={TELA_INICIAL}
                  className="text-reset text-underline-hover"
                >
                  Início
                </NavLinkToTop>
              </p>
              <p>
                <NavLinkToTop
                  to={TELA_SOBRE}
                  className="text-reset text-underline-hover"
                >
                  Sobre
                </NavLinkToTop>
              </p>
              <p>
                <NavLinkToTop
                  to={TELA_BLOG}
                  className="text-reset text-underline-hover"
                >
                  Blog
                </NavLinkToTop>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
              <p>
                <FaHome /> Fortaleza, Ceará, Brasil
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-underline-hover"
                  href="mailto:contato@adotapet.org"
                >
                  <FaEnvelope /> contato@adotapet.org
                </a>
              </p>
              <p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-reset text-underline-hover"
                  href="https://api.whatsapp.com/send/?phone=5585997972854&text=Ol%C3%A1&type=phone_number&app_absent=0"
                >
                  <FaWhatsapp /> +55 (85) 9 9797-2854
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center container">
        <p>
          <span>
            Copyright {anoInicio} {aposAnoInicio && `- ${anoAtual}`}{" "}
            <span className="fw-bold">©</span> Todos os direitos reservados{" "}
          </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-reset text-underline-hover fw-bold"
            href={process.env.REACT_APP_GITHUB_ORGANIZATION_URL}
          >
            Adota Pet Org
          </a>
        </p>

        <p>
          <span>Projeto open source ❤️ Desenvolvido com carinho por </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-reset text-underline-hover fw-bold"
            href="https://lewoaragao.com.br"
          >
            Leonardo Aragão
          </a>
        </p>
      </section>
    </footer>
  );
}

export default Footer;
