import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ element }) {
  const { isUsuarioLogado } = useContext(AuthContext);

  return <> {isUsuarioLogado ? element : <Navigate to="/usuario/entrar" />}</>;
}
