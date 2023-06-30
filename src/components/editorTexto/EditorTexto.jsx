import React, { useRef } from "react";
import JoditEditor from "jodit-react";

/**
 * Editor de texto para
 * criar postagens para
 * Blog, ou caso necessário
 * formatar um texto para
 * envio pro banco de dados
 * @since 30/06/2023 11:22:41
 * @author Leonardo Aragão
 */
const EditorTexto = ({ initialValue, getValue }) => {
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    height: 500,
  };

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
    />
  );
};

export default EditorTexto;
