import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaHome,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
    <footer className="text-center text-lg-start bg-light text-muted">
      <section className="d-flex justify-content-center justify-content-lg-end align-items-center p-4 border-bottom container">
        <div className="me-3 d-none d-lg-block">
          <span>Conecte-se conosco nas redes sociais:</span>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/adotapetorg"
          >
            <FaInstagram />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/adotapetorg"
          >
            <FaGithub />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noreferrer"
            href="https://linkedin.com/company/adotapetorg"
          >
            <FaLinkedin />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/adotapetorg"
          >
            <FaTwitter />
          </a>
          <a
            className="btn btn-warning mx-1"
            target="_blank"
            rel="noreferrer"
            href="https://facebok.com/adotapetorg"
          >
            <FaFacebook />
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

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Serviços</h6>
              <p>
                <NavLink
                  to="/pet/cadastrar"
                  className="text-reset text-underline-hover"
                >
                  Cadastrar Pet
                </NavLink>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Links úteis</h6>
              <p>
                <NavLink to="/" className="text-reset text-underline-hover">
                  Início
                </NavLink>
              </p>
              <p>
                <NavLink
                  to="/sobre"
                  className="text-reset text-underline-hover"
                >
                  Sobre
                </NavLink>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
              <p>
                <FaHome /> Fortaleza, Ceará, Brasil
              </p>
              <p>
                <FaEnvelope />{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-reset text-underline-hover"
                  href="mailto:contato@adotapet.org"
                >
                  contato@adotapet.org
                </a>
              </p>
              <p>
                <FaWhatsapp />{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-reset text-underline-hover"
                  href="https://api.whatsapp.com/send/?phone=5585997972854&text=Ol%C3%A1&type=phone_number&app_absent=0"
                >
                  +55 (85) 9 9797-2854
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center p-4 d-flex justify-content-between align-items-center flex-wrap gap-4 container">
        <div>
          <span>
            Copyright {anoInicio} {aposAnoInicio && `- ${anoAtual}`}{" "}
            <span className="fw-bold">©</span> Todos os direitos reservados{" "}
          </span>
          <a
            target="_blank"
            rel="noreferrer"
            className="text-reset text-underline-hover fw-bold"
            href={process.env.REACT_APP_GITHUB_ORGANIZATION_URL}
          >
            Adota Pet Org
          </a>
        </div>

        <div>
          <span>Desenvolvido com carinho por </span>
          <a
            target="_blank"
            rel="noreferrer"
            className="text-center text-reset text-underline-hover fw-bold"
            href="https://lewoaragao.com.br"
          >
            Leonardo Aragão
          </a>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
