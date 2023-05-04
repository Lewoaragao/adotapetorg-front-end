import { useEffect, useState } from 'react';
import Api from '../../services/Api'
import TituloPagina from './../../components/TituloPagina'
import { TbAlertTriangle } from 'react-icons/tb'
import { Button, Card, CardGroup, Col, Row } from 'react-bootstrap';
import Carregamento from '../../components/Carregamento';

function Inicio({ logo }) {

  const [listaPets, setListaPets] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    listarTodosPets()
  }, []);

  function listarTodosPets() {
    setIsLoading(true)
    Api.get("pets")
      .then(({ data }) => {
        setListaPets(data.data)
      }).catch(({ response }) => {
        console.log(response.data.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }


  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="text-center">

        <img src={logo} className="rounded-circle" width="300px" alt="logo adota pet org" />

        <TituloPagina titulo="Início" />

        <p className="bg-dark text-warning fs-1 fw-bold rounded mt-2">
          <TbAlertTriangle /> Em desenvolvimento <TbAlertTriangle />
        </p>
        <p>
          <a
            className="nav-link d-inline mx-2 text-underline-hover fs-4"
            href="https://github.com/adotapetorg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="nav-link d-inline mx-2 text-underline-hover fs-4"
            href="https://instagram.com/adotapetorg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="nav-link d-inline mx-2 text-underline-hover fs-4"
            href="https://youtube.com/@adotapetorg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube
          </a>
        </p>

        {isLoading
          ?
          <Carregamento />
          :
          <Row xs={2} md={3} className="g-4">
            {listaPets.map((pet) => (
              <Col>
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
      </div >
    </div>
  )
}

export default Inicio