import TituloPagina from './../../components/TituloPagina'

function Sobre() {
    return (
        <div>
            <TituloPagina titulo="Sobre" />

            <h2 className="text-primary">Nossa história</h2>
            <p>Tudo começou comigo e minha esposa, com um amor muito grande pelos pets, em especial nossa cadelinha chamada Chandelly (sim sim, o nome faz referência aquele iogurte) e ela faz jus ao nome, pois ela é um docinho, com esse amor pelos pets crescendo, acabou que resolvi desenvolver um sistema no qual ONGs, empresas privadas ou pessoas que tenham interesse em doar animais, onde possam facilmente cadastrá-los no sistema e divulgar com facilidade a adoção através do contato pela internet.</p>

            <h2 className="text-primary">A organização</h2>
            <p>Nós somos uma organização sem fins lucrativos, onde desenvolvemos um sistema para ajudar nossos amados Pets a encontrar um lar através da adoção ou reencontrar o lar através do nosso sistema de busca de animais.</p>

            <h2 className="text-primary">Data de criação</h2>
            <p>17/03/2023</p>
        </div>
    )
}

export default Sobre