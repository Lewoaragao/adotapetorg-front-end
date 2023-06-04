import { createContext, useEffect, useState } from "react";
import Api from "../services/Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState({});
  const [isUsuarioLogado, setIsUsuarioLogado] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    verificaUsuarioLogado();
    // eslint-disable-next-line
  }, []);

  const setarUsuarioLogado = (usuario, token, isLogado) => {
    setUsuarioLogado(usuario);
    setToken(token);
    setIsUsuarioLogado(isLogado);
  };

  const verificaUsuarioLogado = () => {
    const tokenStorage = localStorage.getItem("token");

    if (tokenStorage != null) {
      Api.get("user", {
        headers: {
          Authorization: `Bearer ${tokenStorage}`,
        },
      })
        .then(({ data }) => {
          setarUsuarioLogado(data.usuario, tokenStorage, true);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUsuarioLogado,
        usuarioLogado,
        setarUsuarioLogado,
        token,
        verificaUsuarioLogado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
