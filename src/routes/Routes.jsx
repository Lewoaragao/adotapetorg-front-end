import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  TELA_BLOG,
  TELA_BLOG_POSTAGEM,
  TELA_BLOG_POSTAGEM_USUARIO_LOGADO,
  TELA_BLOG_POSTAGEM_USUARIO_LOGADO_FAVORITOS,
  TELA_CADASTRO_USUARIO,
  TELA_EDITAR_PERFIL_USUARIO,
  TELA_ERRO_404,
  TELA_INFORMACOES_PET,
  TELA_INICIAL,
  TELA_LINKS,
  TELA_MEUS_LINKS,
  TELA_PETS_USUARIO_LOGADO,
  TELA_PETS_USUARIO_LOGADO_FAVORITOS,
  TELA_POLITICA_PRIVACIDADE,
  TELA_SOBRE,
  TELA_TODOS_PET,
  TELA_USUARIO_ENTRAR,
  TELA_VISUALIZAR_PERFIL_USUARIO,
} from "../components/Constantes";
import logo from "../images/logo-adotapetorg.jpg";
import Blog from "../pages/blog/Blog";
import Error404 from "../pages/error/Error404";
import Inicio from "../pages/inicio/Inicio";
import LinkMeus from "../pages/link/LinkMeus";
import Links from "../pages/link/Links";
import PetInformacao from "../pages/pet/PetInformacao";
import PetUsuarioLogado from "../pages/pet/PetUsuarioLogado";
import PetUsuarioLogadoFavoritos from "../pages/pet/PetUsuarioLogadoFavoritos";
import PoliticaPrivacidade from "../pages/politicaPrivacidade/PoliticaPrivacidade";
import Sobre from "../pages/sobre/Sobre";
import UsuarioCadastrar from "../pages/usuario/UsuarioCadastrar";
import UsuarioEntrar from "../pages/usuario/UsuarioEntrar";
import PrivateRoute from "../routes/PrivateRoute";
import BlogPostagem from "../pages/blog/BlogPostagem";
import PetTodos from "../pages/pet/PetTodos";
import BlogPostagemUsuarioLogado from "../pages/blog/BlogPostagemUsuarioLogado";
import BlogPostagemUsuarioLogadoFavoritos from "../pages/blog/BlogPostagemUsuarioLogadoFavoritos";
import UsuarioEditar from "./../pages/usuario/UsuarioEditar";
import UsuarioPerfil from "../pages/usuario/UsuarioPerfil";

/**
 * Mapa de todas as rotas
 * do sistema
 * @since 04/07/2023 17:07:39
 * @author Leonardo Aragão
 */
export const Routes = createBrowserRouter([
  {
    path: TELA_INICIAL,
    element: <App />,
    children: [
      // ROTAS GERAL
      { path: TELA_INICIAL, element: <Inicio logo={logo} /> },
      { path: TELA_SOBRE, element: <Sobre /> },
      { path: TELA_POLITICA_PRIVACIDADE, element: <PoliticaPrivacidade /> },
      // ROTAS USUÁRIO
      { path: TELA_CADASTRO_USUARIO, element: <UsuarioCadastrar /> },
      { path: TELA_USUARIO_ENTRAR, element: <UsuarioEntrar /> },
      { path: TELA_VISUALIZAR_PERFIL_USUARIO, element: <UsuarioPerfil /> },
      {
        path: TELA_EDITAR_PERFIL_USUARIO,
        element: <PrivateRoute element={<UsuarioEditar />} />,
      },
      // ROTAS PET
      { path: TELA_TODOS_PET, element: <PetTodos /> },
      { path: TELA_INFORMACOES_PET, element: <PetInformacao /> },
      {
        path: TELA_PETS_USUARIO_LOGADO,
        element: <PrivateRoute element={<PetUsuarioLogado />} />,
      },
      {
        path: TELA_PETS_USUARIO_LOGADO_FAVORITOS,
        element: <PrivateRoute element={<PetUsuarioLogadoFavoritos />} />,
      },
      // ROTAS LINK
      {
        path: TELA_MEUS_LINKS,
        element: <PrivateRoute element={<LinkMeus />} />,
      },
      {
        path: TELA_LINKS,
        element: <Links />,
      },
      // ROTAS BLOG
      { path: TELA_BLOG, element: <Blog /> },
      { path: TELA_BLOG_POSTAGEM, element: <BlogPostagem /> },
      {
        path: TELA_BLOG_POSTAGEM_USUARIO_LOGADO,
        element: <PrivateRoute element={<BlogPostagemUsuarioLogado />} />,
      },
      {
        path: TELA_BLOG_POSTAGEM_USUARIO_LOGADO_FAVORITOS,
        element: (
          <PrivateRoute element={<BlogPostagemUsuarioLogadoFavoritos />} />
        ),
      },
      // ROTAS ERRO
      { path: TELA_ERRO_404, element: <Error404 /> },
    ],
  },
]);
