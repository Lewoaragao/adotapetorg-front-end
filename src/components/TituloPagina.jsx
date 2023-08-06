import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { formataTextoCapitalize } from "../utils/Mask";

export default function TituloPagina({ titulo, className, style }) {
  const location = useLocation();
  const locationPathname = location.pathname.replace("/", "");

  useEffect(() => {
    document.title = `${formataTextoCapitalize(
      titulo !== null && titulo !== undefined ? titulo : ""
    )} - ${process.env.REACT_APP_SITE_TITLE}`;

    // adicionando meta tag canonica dinâmicamente dependendo da url da página
    let relCanonical = !!document.querySelector("link[rel='canonical']")
      ? document.querySelector("link[rel='canonical']")
      : document.createElement("link");
    relCanonical.setAttribute("rel", "canonical");
    relCanonical.setAttribute(
      "href",
      process.env.REACT_APP_PUBLIC_URL + locationPathname
    );
    document.head.appendChild(relCanonical);
  }, [titulo, locationPathname]);

  return (
    <>
      <h1
        style={{ style }}
        className={`${className} fw-bold text-primary mb-3 text-capitalize`}
      >
        {titulo}
      </h1>
      <hr />
    </>
  );
}
