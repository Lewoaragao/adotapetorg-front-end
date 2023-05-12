import { useEffect, useState } from 'react'
import TituloPagina from './../../components/TituloPagina'
import { TbAlertTriangle } from 'react-icons/tb'
import Api from '../../services/Api'
import Carregamento from '../../components/Carregamento'
import PetLista from './../../components/pet/PetLista';

function Inicio({ logo }) {

  const [listaPets, setListaPets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [mensagem, setMensagem] = useState(false)

  useEffect(() => {
    listarTodosPets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function listarTodosPets() {
    setIsLoading(true)
    Api.get("pets")
      .then(({ data }) => {
        setListaPets(data.data)
      }).catch(({ response }) => {
        setMensagem(response.data.message)
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
          <PetLista listaPets={listaPets} mensagem={mensagem} />
        }
      </div>
    </div>
  )
}

export default Inicio