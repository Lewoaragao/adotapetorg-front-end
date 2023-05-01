function Inicio({ logo }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="fw-bold mt-3">Início</h1>
        <p id="textoDesenv" className="mt-2">
          Em desenvolvimento...
        </p>
        <p>
          <a
            className="nav-link d-inline mx-2 text-decoration-underline"
            href="https://github.com/adotapetorg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            className="nav-link d-inline mx-2 text-decoration-underline"
            href="https://instagram.com/adotapetorg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className="nav-link d-inline mx-2 text-decoration-underline"
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