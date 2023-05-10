export function formataData(dataFormatar) {
    const data = new Date(`${dataFormatar} 00:00:0000`)
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()

    if(dia < 10) {
        dia = `0${dia}`
    }

    if(mes < 10) {
        mes = `0${mes}`
    }

    const dataFormatada = dia + "/" + mes + "/" + ano
    return dataFormatada
}