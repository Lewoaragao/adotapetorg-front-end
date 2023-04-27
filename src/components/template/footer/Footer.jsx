import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaHome, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

function Footer({ logo }) {
    return (
        <footer className="text-center text-lg-start bg-light text-muted">
            <section className="d-flex justify-content-center justify-content-lg-end align-items-center p-4 border-bottom container">
                <div className="me-3 d-none d-lg-block">
                    <span>Conecte-se conosco nas redes sociais:</span>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <a className="btn btn-primary mx-1" href="https://facebok.com/adotapetorg"><FaFacebook /></a>
                    <a className="btn btn-primary mx-1" href="https://twitter.com/adotapetorg"><FaTwitter /></a>
                    <a className="btn btn-primary mx-1" href="https://"><FaGoogle /></a>
                    <a className="btn btn-primary mx-1" href="https://instagram.com/adotapetorg"><FaInstagram /></a>
                    <a className="btn btn-primary mx-1" href="https://linkedin.com/company/adotapetorg"><FaLinkedin /></a>
                    <a className="btn btn-primary mx-1" href="https://"><FaGithub /></a>
                </div>
            </section>

            <section className="container">
                <div className="text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-3">
                                <img className="rounded me-3" src={logo} alt="Adota Pet Org logo" width="40px" height="40px" />
                                {process.env.REACT_APP_SITE_TITLE}
                            </h6>
                            <p>{process.env.REACT_APP_SITE_DESCRIPTION}</p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Serviços</h6>
                            <p><a href="#!" className="text-reset text-decoration-none disabled">Adotar Pet</a></p>
                            <p><a href="#!" className="text-reset text-decoration-none disabled">Cadastrar Pet</a></p>
                            <p><a href="#!" className="text-reset text-decoration-none disabled">Encontrar Pet</a></p>
                            <p><a href="#!" className="text-reset text-decoration-none disabled">Listar Pet</a></p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Links úteis</h6>
                            <p><a href="/" className="text-reset text-decoration-none disabled">Início</a></p>
                            <p><a href="/usuario/entrar" className="text-reset text-decoration-none disabled">Entrar</a></p>
                            <p><a href="/usuario/cadastrar" className="text-reset text-decoration-none disabled">Cadastrar</a></p>
                            <p><a href="/sobre" className="text-reset text-decoration-none disabled">Sobre</a></p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
                            <p><FaHome /> Brasil, Ceará, Fortaleza</p>
                            <p><FaEnvelope /> <a target="_blank" rel="noreferrer" className="text-reset text-decoration-none" href="mailto:contato@adotapet.org">contato@adotapet.org</a></p>
                            <p><FaWhatsapp /> <a target="_blank" rel="noreferrer" className="text-reset text-decoration-none" href="https://api.whatsapp.com/send/?phone=5585997972854&text=Ol%C3%A1&type=phone_number&app_absent=0">+55 (85) 9 9797-2854</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4">
                <span>© 2023 Copyright:</span>
                <a className="ms-1 text-reset text-decoration-none text-decoration-none fw-bold" href={process.env.REACT_APP_GITHUB_ORGANIZATION_URL}>Adota Pet Org</a>
            </div>
        </footer>
    )
}

export default Footer