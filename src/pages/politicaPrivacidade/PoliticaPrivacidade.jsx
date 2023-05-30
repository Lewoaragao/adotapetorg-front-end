import TituloPagina from "./../../components/TituloPagina";

/**
 * Aqui ficará a descrição do termo
 * de política de privacidade
 * @since 28/05/2023 11:20:51
 * @author Leonardo Aragão
 */
export default function PoliticaPrivacidade() {
  return (
    <>
      <TituloPagina titulo="Política de Privacidade" />

      <p>
        Esta Política de Privacidade descreve como nós, Adota Pet Org,
        coletamos, usamos e protegemos as informações pessoais dos usuários em
        nosso sistema de adoção de pets. Respeitamos a privacidade dos nossos
        usuários e estamos comprometidos em proteger os dados pessoais
        fornecidos por eles. Ao utilizar nosso sistema, você concorda com as
        práticas descritas nesta Política de Privacidade.
      </p>

      <h2 className="fw-bold">Coleta de Informações Pessoais</h2>

      <p>
        Quando você utiliza nosso sistema de adoção de pets, podemos coletar
        determinadas informações pessoais, incluindo seu primeiro nome e
        endereço de e-mail. Essas informações são coletadas para identificar com
        quem falar sobre adotar o pet, bem como para enviar notícias, novas
        postagens no blog e outros informativos, caso você aceite receber tais
        comunicações.
      </p>

      <h2 className="fw-bold">Uso das Informações Pessoais</h2>

      <p>
        O primeiro nome informado é utilizado para facilitar a comunicação e
        oferecer um atendimento mais personalizado em relação à adoção de pets.
        O endereço de e-mail é utilizado para enviar notícias, novas postagens
        no blog, informações sobre mudanças na conta (verificação de e-mail,
        recuperação de senha, mudança de senha, mudanças nos dados do perfil) e
        outros informativos relacionados ao nosso sistema. Essas informações são
        utilizadas internamente e não são compartilhadas com terceiros, a menos
        que expressamente autorizado pelo usuário ou exigido por lei.
      </p>

      <h2 className="fw-bold">Proteção dos Dados Pessoais</h2>

      <p>
        Nós adotamos medidas de segurança adequadas para proteger as informações
        pessoais coletadas em nosso sistema contra acesso não autorizado,
        divulgação, alteração ou destruição. Utilizamos métodos e tecnologias
        padrão da indústria para garantir a integridade e confidencialidade
        dessas informações.
      </p>

      <h2 className="fw-bold">Retenção das Informações Pessoais</h2>

      <p>
        Mantemos as informações pessoais coletadas apenas pelo tempo necessário
        para cumprir os fins descritos nesta Política de Privacidade, a menos
        que uma retenção mais longa seja exigida ou permitida por lei. Após o
        período de retenção, as informações pessoais são devidamente
        descartadas, excluídas ou anonimizadas.
      </p>

      <h2 className="fw-bold">Direitos do Titular dos Dados</h2>

      <p>
        De acordo com a&nbsp;
        <a
          className="text-reset"
          href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
        >
          Lei Geral de Proteção de Dados ( LGPD
        </a>
        ), você possui direitos em relação aos seus dados pessoais. Isso inclui
        o direito de acessar, corrigir, atualizar ou excluir as informações
        pessoais que temos sobre você. Caso deseje exercer esses direitos ou
        alterar suas preferências de comunicação,&nbsp;
        <a className="text-reset" href="#contato">
          entre em contato conosco
        </a>
        &nbsp;através dos canais fornecidos no final desta Política de
        Privacidade.
      </p>

      <h2 className="fw-bold">Alterações na Política de Privacidade</h2>

      <p>
        Podemos atualizar ou modificar esta Política de Privacidade
        periodicamente. Quaisquer alterações significativas serão notificadas
        aos usuários por meio de aviso em nosso sistema ou por outros meios
        apropriados. Recomendamos que você reveja regularmente esta Política de
        Privacidade para estar ciente das atualizações.
      </p>

      <h2 className="fw-bold" id="contato">
        Contato
      </h2>

      <p>
        Se você tiver alguma dúvida ou preocupação relacionada à nossa Política
        de Privacidade ou ao tratamento de seus dados pessoais, entre em contato
        conosco através dos seguintes meios:
      </p>

      <ul>
        <li>
          <span className="fw-bold">Endereço:</span> Fortaleza, Ceará, Brasil
        </li>
        <li>
          <span className="fw-bold">Celular:</span> (85) 99797-2856
        </li>
        <li>
          <span className="fw-bold">E-mail:</span> contato@adotapet.org
        </li>
      </ul>

      <p>
        <span className="fw-bold">Atualizado em:</span> 30/05/2023
      </p>
    </>
  );
}
