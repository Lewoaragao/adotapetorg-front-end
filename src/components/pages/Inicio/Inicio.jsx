export function Inicio({ logo }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="mt-3">
          Em desenvolvimento...
        </p>
        <p>
        <a
          className="App-link"
          href="https://github.com/adotapetorg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          className="App-link"
          href="https://instagram.com/adotapetorg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          className="App-link"
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