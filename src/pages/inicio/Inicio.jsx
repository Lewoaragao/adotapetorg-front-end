import TituloPagina from './../../components/TituloPagina'
import { TbAlertTriangle } from 'react-icons/tb'

function Inicio({ logo }) {
  return (
    <header className="App-header d-flex justify-content-center align-items-center vh-100">
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
      </div>
    </header>
  )
}

export default Inicio