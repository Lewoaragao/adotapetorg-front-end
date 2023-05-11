import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Api from "../../services/Api"
import Carregamento, { CarregamentoBotao } from './../../components/Carregamento'
import TituloPagina from './../../components/TituloPagina'
import { formataData } from "../../utils/DataUtil"
import { formataCelular } from "../../utils/Mask"
import { BsStar, BsStarFill } from "react-icons/bs";
import { AuthContext } from "../../contexts/AuthContext"

function PetInformacao() {

    const { id } = useParams()
    const [pet, setPet] = useState([])
    const [usuarioResponsavel, setUsuarioResponsavel] = useState([])
    const [petFavoritado, setPetFavoritado] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingButton, setIsLoadingButton] = useState(false)
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
        setIsLoadingButton(true)
        setPetFavoritado(true)
        Api.post(`pets/${idPet}/favoritar`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).catch(({ response }) => {
                console.log(response.data.message)
            }).finally(() => {
                setIsLoadingButton(false)
            })
    }

    function desfavoritarPet(idPet) {
        setIsLoadingButton(true)
        setPetFavoritado(false)
        Api.post(`pets/${idPet}/desfavoritar`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).catch(({ response }) => {
                console.log(response.data.message)
            }).finally(() => {
                setIsLoadingButton(false)
            })
    }

    return (
        <>

            {isLoading
                ?
                <Carregamento />
                :
                <>
                    <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
                        <img className="img-thumbnail" style={{ maxWidth: '300px' }} src={process.env.REACT_APP_API_URL + pet.imagem} alt={`foto pet ${pet.nome}`} />
                        <div className="fs-4">


                            <TituloPagina titulo="Pet Informação" />

                            <p><span className="fw-bold">Nome:</span> {pet.nome}</p>
                            <p><span className="fw-bold">Data de nascimento:</span> {formataData(pet.data_nascimento)}</p>
                            <p><span className="fw-bold">Responsável:</span> {usuarioResponsavel.nome}</p>
                            <p><span className="fw-bold">Contato:</span> {formataCelular(usuarioResponsavel.telefone)}</p>
                            <div>
                                {
                                    petFavoritado
                                        ?
                                        <button className="btn btn-warning"
                                            disabled={!isUsuarioLogado}
                                            onClick={() => desfavoritarPet(pet.id)}>
                                            {isLoadingButton ? <CarregamentoBotao /> : <BsStarFill />}
                                        </button>
                                        :
                                        <button className="btn btn-warning"
                                            disabled={!isUsuarioLogado}
                                            onClick={() => favoritarPet(pet.id)}>
                                            {isLoadingButton ? <CarregamentoBotao /> : <BsStar />}
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PetInformacao