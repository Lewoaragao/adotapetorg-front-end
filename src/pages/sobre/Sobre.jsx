import TituloPagina from "./../../components/TituloPagina";

function Sobre() {
  return (
    <div>
      <TituloPagina titulo="Sobre" />

      <div className="mb-5">
        <h3 className="fw-bold">🐶 Nossa história</h3>
        <p className="text-justify fs-5">
          Tudo começou comigo e minha esposa, com um amor muito grande pelos
          pets, em especial nossa cadelinha chamada Chandelly (sim sim, o nome
          faz referência aquele iogurte) e ela faz jus ao nome, pois ela é um
          docinho, com esse amor pelos pets crescendo, acabou que resolvi
          desenvolver um sistema no qual ONGs, empresas privadas ou pessoas que
          tenham interesse em doar animais, onde possam facilmente cadastrá-los
          no sistema e divulgar com facilidade a adoção através do contato pela
          internet.
        </p>
      </div>

      <div className="mb-5">
        <h3 className="fw-bold">🏡 A organização</h3>
        <p className="text-justify fs-5">
          Nós somos uma organização sem fins lucrativos, onde desenvolvemos um
          sistema para ajudar nossos amados Pets a encontrar um lar através da
          adoção ou reencontrar o lar através do nosso sistema de busca de
          animais.
        </p>
      </div>

      <div className="mb-5">
        <h3 className="fw-bold">📆 Data de criação</h3>
        <p className="text-justify fs-5">17/03/2023</p>
      </div>

      <div className="mb-5">
        <h3 className="fw-bold">💛 Adota Pet Org</h3>
        <p className="text-justify fs-5">Um amor sem fronteiras</p>
      </div>

      <div className="mb-5">
        <h3 className="fw-bold">♯ Hashtags</h3>
        <p className="text-justify fs-5">
          #sistema #adota #pet #adocao #gato #org #pets #cachorro #adote #dog
          #cat #cute #foco #cachorros #gatos #love #instadog #instacat #dogs
          #cats #resiliencia #adoteumgato #adoteumcachorro #petstagram #cats
          #dicas #saude
        </p>
      </div>
    </div>
  );
}

export default Sobre;
