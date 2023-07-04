import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { isUsuarioLogado } = useContext(AuthContext);

  return <> {isUsuarioLogado ? children : <Navigate to="/usuario/entrar" />}</>;
}
