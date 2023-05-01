function NavBarUsuarioLogado({ usuarioLogado, logout }) {
    return (
        <>
            <p className="nav nav-link text-primary fw-bold">Olá, {usuarioLogado.nome}</p>
            <button className="nav nav-link text-secondary" onClick={logout}>Sair</button>
        </>
    )
}

export default NavBarUsuarioLogado