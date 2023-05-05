import { useEffect, useState } from 'react'
import Api from '../../services/Api'
import { Card, Col, Row } from 'react-bootstrap'
import Carregamento from '../../components/Carregamento'

function PetListar({ endpoint }) {

    const [listaPets, setListaPets] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        listarTodosPets()
    }, []);

    function listarTodosPets() {
        setIsLoading(true)
        Api.get(`${endpoint}`)
            .then(({ data }) => {
                setListaPets(data.data)
            }).catch(({ response }) => {
                console.log(response.data.message)
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
                <Row xs={2} md={3} className="g-4">
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
                            </Card>
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default PetListar