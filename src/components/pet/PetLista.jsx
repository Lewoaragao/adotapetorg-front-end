import { Card, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function PetLista({ listaPets, msg }) {
    return (
        <>
            <Row xs={2} md={3} className="g-4">
                {listaPets == null
                    ?
                    <div>{msg}</div>
                    :
                    <>
                        {listaPets.map(pet => (
                            <Col key={pet.id}>
                                <Card className="text-center">
                                    <Card.Img variant="top" src={process.env.REACT_APP_API_URL + pet.imagem} alt={`foto pet ${pet.nome}`} />
                                    <Card.Body>
                                        <Card.Title>{pet.nome}</Card.Title>
                                        <Card.Text>
                                            {pet.raca}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <NavLink to={`/pet/informacao/${pet.id}`}>Informações</NavLink >
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </>
                }
            </Row>
        </>
    )
}