import { createContext, useState } from "react";
import Api from "../services/Api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const [usuarioLogado, setUsuarioLogado] = useState({})
    const [isUsuarioLogado, setIsUsuarioLogado] = useState(false)
    const [token, setToken] = useState("")

    const setarUsuarioLogado = (usuario, token, isLogado) => {
        setUsuarioLogado(usuario)
        setToken(token)
        setIsUsuarioLogado(isLogado)
    }

    const verificaUsuarioLogado = () => {
        const tokenStorage = localStorage.getItem('token')

        if (tokenStorage != null) {
            Api.get("user", {
                headers: {
                    Authorization: `Bearer ${tokenStorage}`
                }
            }).then(({ data }) => {
                setarUsuarioLogado(data.usuario, tokenStorage, true)
            }).catch(({ response }) => {
                console.log(response.data.message)
            })
        }
    }

    const getUsuarioLogado = () => {
        return usuarioLogado
    }

    return (
        <AuthContext.Provider value={{ isUsuarioLogado, usuarioLogado, setarUsuarioLogado, token, verificaUsuarioLogado, getUsuarioLogado }}>
            {children}
        </AuthContext.Provider>
    )
}