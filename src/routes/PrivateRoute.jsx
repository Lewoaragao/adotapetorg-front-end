import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";

export default function PrivateRoute({ element }) {
  const { isUsuarioLogado } = useContext(AuthContext);

  return (
    <> {isUsuarioLogado ? <Outlet /> : <Navigate to="/usuario/entrar" />}</>
  );
}
