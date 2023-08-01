/**
 * Aqui será a pagina dedicada
 * a uma postagem que o usuário
 * deseja ler por completa
 * @since 30/06/2023 19:24:57
 * @author Leonardo Aragão
 */

/**
 * Formata o celular vindo como número
 * e retorna como texto formatado
 * @param {integer} celular
 * @returns {string} celular (99) 99999-9999
 */
export function formataCelular(celular) {
  if (!celular) return null;
  celular = celular.replace(/\D/g, "");
  celular = celular.replace(/(\d{2})(\d)/, "($1) $2");
  celular = celular.replace(/(\d)(\d{4})$/, "$1-$2");
  return celular;
}

/**
 * Recebe um link e remove
 * os prefiros http ou https
 * @param {string} link
 * @returns {string} linkFormatado
 */
export function formataLink(link) {
  if (!link) return null;

  const prefixos = ["http://", "https://", "http://www.", "https://www."];

  for (const prefixo of prefixos) {
    if (link.startsWith(prefixo)) {
      return link.substring(prefixo.length);
    }
  }

  return link.toLowerCase();
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
 * @returns {string} dataFormata dd/MM/yyyy
 */
export function formataDataDDMMYYYY(dataFormatar) {
  const dataObj = new Date(dataFormatar);
  const dia = String(dataObj.getDate()).padStart(2, "0");
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

/**
 * Formarta um texto com capitalize
 * com cada primeira letra das palavras
 * em maiúsculo
 * @param {string} textoFormatar
 * @returns {string} textoFormatado "Nesse Estilo"
 */
export function formataTextoCapitalize(textoFormatar) {
  return textoFormatar.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
}

/**
 * Formarta um texto com UPPERCASE
 * com todas palaravas em maiúsculo
 * @param {string} textoFormatar
 * @returns {string} textoFormatado "NESSE ESTILO"
 */
export function formataTextoUpperCase(textoFormatar) {
  return textoFormatar.toUpperCase();
}

/**
 * Formarta um texto com lowercase
 * com todas palaravas em minúsculo
 * @param {string} textoFormatar
 * @returns {string} textoFormatado "nesse estilo"
 */
export function formataTextoLowerCase(textoFormatar) {
  return textoFormatar.toLowerCase();
}

/**
 * Mostrar primeiro e último nome
 * de um usuário, geralmente utilizado
 * para mostrar o nome do autor da postagem
 * do blog
 * @param {string} nomeCompleto
 * @returns {string} nomeFormatado
 */
export function formataPrimeiroUltimoNome(nomeCompleto) {
  const partesNome = nomeCompleto.split(" ");
  const primeiroNome = partesNome[0];
  const ultimoNome = partesNome[partesNome.length - 1];
  return `${primeiroNome} ${ultimoNome}`;
}

export function formataPrimeiroNome(nomeCompleto) {
  const partesNome = nomeCompleto.split(" ");
  const primeiroNome = partesNome[0];
  return `${primeiroNome}`;
}

export function formataUltimoNome(nomeCompleto) {
  const partesNome = nomeCompleto.split(" ");
  const ultimoNome = partesNome[partesNome.length - 1];
  return `${ultimoNome}`;
}

/**
 * É usada uma exxpressão regular
 * para encontrar a hora no formato hh:mm:ss
 * no texto e removê-la do mesmo
 * @param {string} texto
 * @returns {string} textoSemHora
 */
export function formataRemovendoHora(texto) {
  const regexHora = /\b\d{2}:\d{2}:\d{2}\b/g;
  const textoSemHora = texto.replace(regexHora, "");
  return textoSemHora;
}

/**
 * Recebe o parametro data nascimento
 * e retorna a idade no formato
 * anos, meses e dias
 * @param {string} dataNascimento
 * @returns {string} idade
 */
export function formataMostrandoIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let anos = hoje.getFullYear() - nascimento.getFullYear();
  let meses = hoje.getMonth() - nascimento.getMonth();
  let dias = hoje.getDate() - nascimento.getDate();

  // Verificar se o dia de aniversário já ocorreu este mês
  if (meses < 0 || (meses === 0 && dias < 0)) {
    anos--;
    if (hoje.getMonth() === nascimento.getMonth()) {
      meses = 0;
    } else {
      meses += 12;
    }
  }

  // Tratar dias negativos ou zero
  if (dias <= 0) {
    const ultimoDiaMesAnterior = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      0
    ).getDate();
    meses--;
    dias += ultimoDiaMesAnterior;
  }

  return `${anos}a ${meses}m ${dias}d`;
}

export function obterParteAntesDoArroba(email) {
  // Verifica se o email é válido
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return "";
  }

  // Divide o email em duas partes usando o "@" como separador
  const partes = email.split("@");

  // Retorna a primeira parte (antes do "@")
  return partes.shift();
}
