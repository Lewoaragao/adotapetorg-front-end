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
