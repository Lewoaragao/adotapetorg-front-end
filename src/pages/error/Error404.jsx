import { AiFillAlert } from "react-icons/ai";
import { GiCat } from "react-icons/gi";
import TituloPagina from "../../components/TituloPagina";
import NavLinkToTop from "../../components/navLinkToTop/NavLinkToTop";

function Error404() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <span className="text-primary fs-1">
          <AiFillAlert />
        </span>
        <TituloPagina titulo="Erro 404" />
        <h2>Ops... essa página não existe</h2>
        <div align="end">
          <NavLinkToTop
            className="btn btn-secondary mt-2"
            to="/"
            title="Voltar para página inicial"
          >
            <GiCat /> Voltar
          </NavLinkToTop>
        </div>
      </div>
    </div>
  );
}

export default Error404;
