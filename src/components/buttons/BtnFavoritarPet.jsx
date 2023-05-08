import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import Api from "../../services/Api"
import { useEffect } from "react";

function BtnFavoritarPet({ idPet, listaIdsPetsFavoritos, token, isUsuarioLogado }) {

    useEffect(() => {
        console.log(listaIdsPetsFavoritos)
        console.log(listaIdsPetsFavoritos.find(e => e = 1))
    }, [listaIdsPetsFavoritos]);

    function favoritarPet(idPet) {
        Api.post(`pets/${idPet}/favoritar`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(({ data }) => {
                // setMsgTipo("success")
                console.log(data.message)
            }).catch(({ response }) => {
                // setMsgTipo("danger")
                console.log(response.data.message)
            }).finally(() => {
                // console.log(false)
            })
    }

    function desfavoritarPet(idPet) {
        Api.post(`pets/${idPet}/desfavoritar`, null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(({ data }) => {
                // setMsgTipo("success")
                console.log(data.message)
            }).catch(({ response }) => {
                // setMsgTipo("danger")
                console.log(response.data.message)
            }).finally(() => {
                // console.log(false)
            })
    }

    return (
        <>
            {isUsuarioLogado
                ?
                <button className="nav nav-link fs-2 text-dark"
                    // title={listaIdsPetsFavoritos == idPet ? "Desfavoritar pet" : "Favoritar pet"}
                    // onClick={() => {
                    //     listaIdsPetsFavoritos.includes(idPet) ? desfavoritarPet(idPet) : favoritarPet(idPet)
                    // }}
                    >
                    {listaIdsPetsFavoritos.find(e => e = idPet) ? <AiFillStar /> : <AiOutlineStar />}
                </button>
                :
                <button className="nav nav-link fs-2 text-secondary"
                    disabled
                    title="Entre para favoritar um pet">
                    <AiOutlineStar />
                </button>
            }
        </>
    )
}

export default BtnFavoritarPet