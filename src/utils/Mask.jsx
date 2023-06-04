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
