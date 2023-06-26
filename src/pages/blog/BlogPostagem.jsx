import TituloPagina from "./../../components/TituloPagina";
import placeholderBlog from "../../images/placeholder-blog.jpg";
import { Row } from "react-bootstrap";

/**
 * Aqui será a pagina dedicada
 * a uma postagem que o usuário
 * deseja ler por completa
 * @since 26/06/2023 11:13:35
 * @author Leonardo Aragão
 */
export default function BlogPostagem() {
  return (
    <div className="mx-auto" style={{ maxWidth: "600px" }}>
      <TituloPagina
        titulo={
          "TITULO 10 Motivos pelos quais Adotar um Pet vai Transformar sua Vida!"
        }
      />
      <h4>
        RESUMO Descubra as razões emocionantes pelas quais adotar um pet pode
        trazer alegria, companheirismo e amor incondicional para sua vida.
      </h4>
      <p className="fst-italic text-muted">
        AUTOR Leonardo Aragão | DATA 26/06/2023
      </p>

      <Row className="mb-3">
        <img
          className="mb-3 img-thumbnail mx-auto"
          src={placeholderBlog}
          alt="teste imagem postagem blog"
        />

        <p className="text-justify">
          Adotar um pet pode ser uma das decisões mais gratificantes da sua
          vida. Além de encontrar um companheiro leal e carinhoso, você também
          experimentará inúmeros benefícios emocionais e transformações
          positivas na sua rotina diária. Neste artigo, vamos destacar os 10
          motivos pelos quais adotar um pet vai transformar sua vida.
        </p>
        <p className="text-justify">
          Amor incondicional: Os pets adotados são conhecidos por oferecerem
          amor incondicional. Eles serão seus fiéis companheiros, sempre prontos
          para confortar, brincar e alegrar seus dias. Independentemente do seu
          estado de espírito, eles estarão lá para lhe dar amor e apoio.
        </p>
        <p className="text-justify">
          Companheirismo: Ter um pet em casa significa ter uma companhia
          constante. Eles são ótimos ouvintes, estão sempre presentes nos
          momentos bons e ruins, e trazem alegria para seu dia a dia. Você nunca
          se sentirá sozinho com um pet ao seu lado, pois eles estão sempre
          dispostos a compartilhar momentos especiais com você.
        </p>
        <p className="text-justify">
          Bem-estar emocional: A presença de um pet pode ajudar a reduzir o
          estresse e a ansiedade. Eles proporcionam conforto emocional e são
          verdadeiros aliados no combate à solidão e à tristeza. Acariciar um
          pet e receber seu carinho pode ter um efeito calmante e relaxante,
          melhorando seu bem-estar emocional e promovendo uma sensação de
          felicidade.
        </p>
        <p className="text-justify">
          Estímulo à atividade física: Cuidar de um pet envolve atividades como
          passeios, brincadeiras e exercícios. Isso estimula uma vida mais
          ativa, beneficiando tanto a saúde do pet quanto a sua própria. A
          oportunidade de se exercitar com seu pet fortalece o vínculo entre
          vocês, além de contribuir para sua saúde e condicionamento físico.
        </p>
        <p className="text-justify">
          Senso de responsabilidade: Adotar um pet é uma grande responsabilidade
          e uma oportunidade de aprender a cuidar de outro ser vivo. Isso
          desenvolve o senso de responsabilidade e empatia, além de promover um
          maior senso de propósito na vida. Ao assumir o compromisso de cuidar
          de um pet, você aprende a ser responsável por suas necessidades
          básicas, como alimentação, higiene e saúde.
        </p>

        <span className="d-flex gap-3">
          <span>tags</span>
          <span>adoção</span>
          <span>pet</span>
          <span>vida</span>
        </span>
      </Row>
    </div>
  );
}
