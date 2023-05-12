import { useContext, useEffect, useState } from "react";
import Api from "../../services/Api";
import { AuthContext } from "../../contexts/AuthContext";
import { Card, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Carregamento from "../../components/Carregamento";
import TituloPagina from '../../components/TituloPagina';

export default function PetUsuarioLogadoFavoritos() {

    const { token } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [listaPets, setListaPets] = useState([])
    const [msg, setMsg] = useState("")

    useEffect(() => {
        listarPetsUsuarioLogadoFavoritos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function listarPetsUsuarioLogadoFavoritos() {
        setIsLoading(true)
        Api.post("pets/favoritos/user", null,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(({ data }) => {
                setListaPets(data)
            }).catch(({ response }) => {
                setListaPets(null)
                setMsg(response.data.message)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            {isLoading
                ?
                <Carregamento />
                :
                <>
                    <TituloPagina titulo="Pet Meus Favoritos" />

                    <Row xs={2} md={3} className="g-4">
                        {listaPets == null
                            ?
                            <div>{msg}</div>
                            :
                            <>
                                {listaPets.map(pet => (
                                    <Col key={pet.id}>
                                        <Card>
                                            <Card.Img variant="top" src={process.env.REACT_APP_API_URL + pet.imagem} alt={`foto pet ${pet.nome}`} />
                                            <Card.Body >
                                                <Card.Title>{pet.nome}</Card.Title>
                                                <Card.Text>
                                                    {pet.raca}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer><NavLink to={`/pet/informacao/${pet.id}`}>Informações</NavLink ></Card.Footer>
                                        </Card>
                                    </Col>
                                ))}
                            </>
                        }
                    </Row>
                </>
            }
        </>
    )
}