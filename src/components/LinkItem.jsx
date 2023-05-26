import { Row } from "react-bootstrap";

/**
 * Componente link item para formatação
 * padrão no modelo que os links
 * serão exibidos
 * @since 25/05/2023 23:41:00
 * @author Leonardo Aragão
 */
export default function LinkItem({ titulo, url }) {
  return (
    <Row>
      <a
        className="text-reset text-underline-hover"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="btn btn-outline-primary w-100 mb-3">{titulo}</button>
      </a>
    </Row>
  );
}
