import Alert from 'react-bootstrap/Alert'

function Mensagem({ mensagem, mensagemTipo }) {
    return (
        <>
            {mensagem !== '' && mensagem !== null && (
                <Alert variant={mensagemTipo}>
                    {mensagem}
                </Alert>
            )}
        </>
    )
}

export default Mensagem