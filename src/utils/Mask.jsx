export function formataCelular(celular) {
    if (!celular) return ""
    celular = celular.replace(/\D/g, '')
    celular = celular.replace(/(\d{2})(\d)/, "($1) $2")
    celular = celular.replace(/(\d)(\d{4})$/, "$1-$2")
    return celular
}