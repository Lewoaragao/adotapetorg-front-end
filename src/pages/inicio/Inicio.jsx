import PetListarTodos from '../../components/pet/PetListarTodos'
import TituloPagina from './../../components/TituloPagina'
import { TbAlertTriangle } from 'react-icons/tb'

function Inicio({ logo }) {
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

        <PetListarTodos />
      </div>
    </div>
  )
}

export default Inicio