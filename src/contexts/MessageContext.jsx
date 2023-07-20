/**
 * Mensagem global para tratar
 * avisos e erros no sistema
 * @since 06/06/2023 11:10:30
 * @author Leonardo Aragão
 */
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { CgCloseR } from "react-icons/cg";
import { TIPO_ALERTA } from "../components/Constantes";
import "../styles/Mensagem.css";
import { horaAtual } from "../utils/Util";
import { formataRemovendoHora } from "../utils/Mask";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [mensagem, setMensagem] = useState("");
  const [mensagemTipo, setMensagemTipo] = useState(TIPO_ALERTA);
  const [isVisible, setIsVisible] = useState(false);
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (mensagem !== "" && mensagem !== null) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [mensagem]);

  /**
   * É necessário passar pelo menos o parâmetro mensagem,
   * pois se mensagemTipo igual a null por padrão ele fica
   * como warning:
   *
   * mensagem: onde é passado a mensagem
   * a ser exibida
   *
   * mensagemTipo: baseado nos nomes das classes
   * do bootstrap, exemplo "success", "warning" ou "danger",
   * são as mais utilizadas
   *
   * @param {string} mensagem
   * @param {string} mensagemTipo
   */
  function setarMensagem(mensagem, mensagemTipo) {
    /**
     * Usado a hora atual como ID da mensagem
     * para que ela sempre seja mostrada na tela
     * pois ocorria que ao ser a mesma mensagem
     * ela não era exibida na tela
     */
    setMensagem(`${mensagem} ${horaAtual()}`);

    mensagemTipo !== null
      ? setMensagemTipo(mensagemTipo)
      : setMensagemTipo(TIPO_ALERTA);

    switch (mensagemTipo) {
      case "success":
        setClassName("mensagem-global mensagem-global-success");
        break;
      case "danger":
        setClassName("mensagem-global mensagem-global-danger");
        break;
      default:
        setClassName("mensagem-global mensagem-global-warning");
        break;
    }
  }

  function handleMessageVisible() {
    setIsVisible(!isVisible);
  }

  return (
    <MessageContext.Provider value={{ mensagem, setarMensagem }}>
      {isVisible && (
        <div className={className} onClick={handleMessageVisible}>
          <Alert variant={mensagemTipo}>
            {formataRemovendoHora(mensagem)}{" "}
            <span className="ms-2 fs-5">
              <CgCloseR />
            </span>
          </Alert>
        </div>
      )}

      {children}
    </MessageContext.Provider>
  );
};
