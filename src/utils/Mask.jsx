export function formataCelular(celular) {
  if (!celular) return null;
  celular = celular.replace(/\D/g, "");
  celular = celular.replace(/(\d{2})(\d)/, "($1) $2");
  celular = celular.replace(/(\d)(\d{4})$/, "$1-$2");
  return celular;
}

export function formataLink(link) {
  if (!link) return null;

  if (link.includes("https://")) {
    link = link.replace("https://", "");
  } else if (link.includes("http://")) {
    link = link.replace("http://", "");
  }

  return link;
}

export function formataSexoPet(sexo) {
  return sexo === "M" ? "Macho" : "Fêmea";
}

export function formataTamanhoPet(tamanho, sexo) {
  if (sexo === "M") {
    switch (tamanho) {
      case "P":
        return "Pequeno";

      case "M":
        return "Médio";

      case "G":
        return "Grande";

      default:
        return "";
    }
  } else {
    switch (tamanho) {
      case "P":
        return "Pequena";

      case "M":
        return "Média";

      case "G":
        return "Grande";

      default:
        return "";
    }
  }
}

/**
 * A dataFormatar vem no formato
 * 2023-06-28T23:13:50.000000Z
 * que é o formado da data created_at
 * ao salvar o objeto no banco de dados
 * pela api feita com o framework Laravel
 * @param {string} dataFormatar
 * @returns {string} data dd/MM/yyyy
 */
export function formataDataDDMMYYYY(dataFormatar) {
  const dataObj = new Date(dataFormatar);
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
