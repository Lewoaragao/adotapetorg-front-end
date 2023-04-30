import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState({})
    const [isUsuarioLogado, setIsUsuarioLogado] = useState(false)

    const setarIsUsuarioLogado = (value) => {
        setIsUsuarioLogado(value)
    }

    const setarUsuarioLogado = (value) => {
        setUsuarioLogado(value)
    }

    return (
        <AuthContext.Provider value={
            {
                isUsuarioLogado, setarIsUsuarioLogado,
                usuarioLogado, setarUsuarioLogado
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}