import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Api from "../../services/Api"
import Carregamento from './../../components/Carregamento'
import TituloPagina from './../../components/TituloPagina'
import { formataData } from "../../utils/DataUtil"
import { formataCelular } from "../../utils/Mask"
import { BsStar, BsStarFill } from "react-icons/bs";
import { AuthContext } from "../../contexts/AuthContext"
import Mensagem from "../../components/mensagem/Mensagem"

function PetInformacao() {

    const { id } = useParams()
    const [pet, setPet] = useState([])
    const [usuarioResponsavel, setUsuarioResponsavel] = useState([])
    const [petFavoritado, setPetFavoritado] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [msgTipo, setMsgTipo] = useState("warning")
    const { token, isUsuarioLogado } = useContext(AuthContext)

    useEffect(() => {
        verInformacaoPet(id)
    }, [id]);

    function verInformacaoPet(idPet) {
        setIsLoading(true)
        Api.get(`pets/${idPet}`)
            .then(({ data }) => {
                setPet(data.pet)
                setUsuarioResponsavel(data.user)
                setPetFavoritado(data.pet_favoritado)
            }).catch(({ response }) => {
                console.log(response.data.message)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    function favoritarPet(idPet) {
        setIsLoading(true)
        setPetFavoritado(true)
        Api.post(`pets/${idPet}/favoritar`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(({ data }) => {
                setMsgTipo("success")
                setMsg(data.message)
            }).catch(({ response }) => {
                setMsgTipo("danger")
                setMsg(response.data.message)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    function desfavoritarPet(idPet) {
        setIsLoading(true)
        setPetFavoritado(false)
        Api.post(`pets/${idPet}/desfavoritar`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(({ data }) => {
                setMsgTipo("success")
                setMsg(data.message)
            }).catch(({ response }) => {
                setMsgTipo("danger")
                setMsg(response.data.message)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            {
                isLoading
                    ?
                    <Carregamento />
                    :
                    <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
                        <img className="img-thumbnail" style={{ maxWidth: '300px' }} src={process.env.REACT_APP_API_URL + pet.imagem} alt={`foto pet ${pet.nome}`} />
                        <div className="fs-4">
                            <Mensagem mensagem={msg} mensagemTipo={msgTipo} />
                            <TituloPagina titulo="Informação Pet" />
                            <p><span className="fw-bold">Nome:</span> {pet.nome}</p>
                            <p><span className="fw-bold">Data de nascimento:</span> {formataData(pet.data_nascimento)}</p>
                            <p><span className="fw-bold">Responsável:</span> {usuarioResponsavel.nome}</p>
                            <p><span className="fw-bold">Contato:</span> {formataCelular(usuarioResponsavel.telefone)}</p>
                            {
                                petFavoritado
                                    ?
                                    <button className="btn btn-warning" 
                                    disabled={!isUsuarioLogado}
                                    onClick={() => desfavoritarPet(pet.id)}>
                                        <BsStarFill />
                                        </button>
                                    :
                                    <button className="btn btn-warning" 
                                    disabled={!isUsuarioLogado}
                                    onClick={() => favoritarPet(pet.id)}>
                                        <BsStar />
                                        </button>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default PetInformacao