import TituloPagina from './../../components/TituloPagina'

function Inicio({ logo }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo adota pet org" />
        
        <TituloPagina titulo="Início"/>

        <p className="text-info fs-1 fw-bold rounded mt-2">
          Em desenvolvimento...
        </p>
        <p>
          <a
            className="nav-link d-inline mx-2 text-underline-hover"
            href="https://github.com/adotapetorg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="nav-link d-inline mx-2 text-underline-hover"
            href="https://instagram.com/adotapetorg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="nav-link d-inline mx-2 text-underline-hover"
            href="https://youtube.com/@adotapetorg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube
          </a>
        </p>
      </header>
    </div>
  )
}

export default Inicio