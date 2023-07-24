import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";
import reportWebVitals from "./reportWebVitals";
import { Routes } from "./routes/Routes";

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
        <RouterProvider router={Routes} />
      </MessageProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Se você deseja começar a medir o desempenho em seu aplicativo, passe uma função
// para registrar os resultados (por exemplo: reportWebVitals(console.log))
// ou envie para um endpoint analítico. Saiba mais: https://bit.ly/CRA-vitals
reportWebVitals();
