import { useParams } from "react-router-dom";
import TituloPagina from "../../components/TituloPagina";

/**
 * Página de edição de perfil do usuário
 * @since 05/08/2023  15:42:27
 * @author Leonardo Aragão
 */
export default function UsuarioPerfil() {
  const { usuario } = useParams();

  return (
    <>
      <TituloPagina titulo={`Perfil de ${usuario}`} />
    </>
  );
}
