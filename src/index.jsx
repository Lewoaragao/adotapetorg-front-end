import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./App.css";
import {
  TELA_BLOG,
  TELA_BLOG_POSTAGEM,
  TELA_CADASTRO_PET,
  TELA_CADASTRO_USUARIO,
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
} from "./components/Constantes";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";
import logo from "./images/logo-adotapetorg.jpg";
import Blog from "./pages/blog/Blog";
import Error404 from "./pages/error/Error404";
import Inicio from "./pages/inicio/Inicio";
import LinkMeus from "./pages/link/LinkMeus";
import Links from "./pages/link/Links";
import PetCadastrar from "./pages/pet/PetCadastrar";
import PetInformacao from "./pages/pet/PetInformacao";
import PetUsuarioLogado from "./pages/pet/PetUsuarioLogado";
import PetUsuarioLogadoFavoritos from "./pages/pet/PetUsuarioLogadoFavoritos";
import PoliticaPrivacidade from "./pages/politicaPrivacidade/PoliticaPrivacidade";
import Sobre from "./pages/sobre/Sobre";
import UsuarioCadastrar from "./pages/usuario/UsuarioCadastrar";
import UsuarioEntrar from "./pages/usuario/UsuarioEntrar";
import reportWebVitals from "./reportWebVitals";
import PrivateRoute from "./routes/PrivateRoute";
import BlogPostagem from "./pages/blog/BlogPostagem";
import PetTodos from "./pages/pet/PetTodos";

const router = createBrowserRouter([
  {
    path: TELA_INICIAL,
    element: <App />,
    children: [
      // ROTAS GERAL
      { path: TELA_INICIAL, element: <Inicio logo={logo} /> },
      { path: TELA_SOBRE, element: <Sobre /> },
      { path: TELA_BLOG, element: <Blog /> },
      { path: TELA_BLOG_POSTAGEM, element: <BlogPostagem /> },
      { path: TELA_POLITICA_PRIVACIDADE, element: <PoliticaPrivacidade /> },
      // ROTAS USUÁRIO
      { path: TELA_CADASTRO_USUARIO, element: <UsuarioCadastrar /> },
      { path: TELA_USUARIO_ENTRAR, element: <UsuarioEntrar /> },
      // ROTAS PET
      { path: TELA_TODOS_PET, element: <PetTodos /> },
      {
        path: TELA_CADASTRO_PET,
        element: <PrivateRoute element={<PetCadastrar />} />,
      },
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
      // ROTAS ERRO
      { path: TELA_ERRO_404, element: <Error404 /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /**
   * AXIOS fazendo duas requisições ao invés de uma
   *
   * Explicação:
   * O <React.StrictMode> é um recurso do React que ajuda a identificar possíveis problemas em seu código e a
   * garantir que seu código esteja seguindo as melhores práticas recomendadas pelo React. Ele faz isso executando certas verificações extras em seu código, que podem
   * resultar em renderizações adicionais.
   * Uma das verificações adicionais que o <React.StrictMode> executa é executar o render duas vezes para ajudar a identificar possíveis efeitos colaterais que podem ocorrer
   * durante as renderizações. Como o useEffect é um hook que é acionado após a renderização do componente, é possível que ele seja executado duas vezes devido a essa
   * verificação adicional do <React.StrictMode>.
   * Se você quiser desligar essa feature, pode ir ao index.tsx e remover o StrictMode.
   * Vale apontar que isso só acontece durante o desenvolvimento, nas versões de produção o React remove isso pra gente.
   *
   * Documentação:
   * https://pt-br.legacy.reactjs.org/docs/strict-mode.html#gatsby-focus-wrapper
   */

  <React.StrictMode>
    <AuthProvider>
      <MessageProvider>
        <RouterProvider router={router} />
      </MessageProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Se você deseja começar a medir o desempenho em seu aplicativo, passe uma função
// para registrar os resultados (por exemplo: reportWebVitals(console.log))
// ou envie para um endpoint analítico. Saiba mais: https://bit.ly/CRA-vitals
reportWebVitals();
