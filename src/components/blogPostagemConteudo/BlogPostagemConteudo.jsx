import DOMPurify from "dompurify";

/**
 * Componente para renderizar
 * o HTML vindo do banco de dados
 * @since 28/06/2023 21:56:22
 * @author Leonardo Aragão
 */
export default function BlogPostagemConteudo({ html }) {
  const conteudoSanitizado = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: conteudoSanitizado }} />;
}
