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
