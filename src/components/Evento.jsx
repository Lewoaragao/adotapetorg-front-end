function Evento({ numero }) {
    function meuEvento() {
        console.log(`Opa, fui ativado! ${numero}`)
    }

    return (
        <div>
            <p>Clique para disparar um evento:</p>
            <Button text="Primeiro Evento" />
            <button onClick={meuEvento}>Ativar</button>
        </div>
    )
}

export default Evento