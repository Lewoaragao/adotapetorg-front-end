/**
 * Recebe uma string no formato "dd/MM/yyyy"
 * ou seja dia, mês e ano separado por barra (/)
 * e retorna uma data no formato Date
 * @param {string} dataFormatar
 * @returns {Date} dataDate
 */
export default function formataData(dataFormatar) {
  const data = new Date(`${dataFormatar} 00:00:0000`);
  let dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();

  if (dia < 10) {
    dia = `0${dia}`;
  }

  if (mes < 10) {
    mes = `0${mes}`;
  }

  const dataFormatada = dia + "/" + mes + "/" + ano;
  return dataFormatada;
}

export function horaAtual() {
  const hoje = new Date();
  const horas = String(hoje.getHours()).padStart(2, "0");
  const minutos = String(hoje.getMinutes()).padStart(2, "0");
  const segundos = String(hoje.getSeconds()).padStart(2, "0");
  return `${horas}:${minutos}:${segundos}`;
}

export function dataAtual() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function dataHoraAtual() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const horas = hoje.getHours();
  const minutos = hoje.getMinutes();
  const segundos = hoje.getSeconds();
  return `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;
}
