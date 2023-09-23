import { useContext, useEffect, useState } from "react";
import { BsStar, BsStarFill, BsWhatsapp } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import {
  formataCelular,
  formataMostrandoIdade,
  formataSexoPet,
  formataTamanhoPet,
  formataTelefone,
} from "../../utils/Mask";
import CarregamentoTela, {
  CarregamentoBotao,
} from "./../../components/Carregamento";
import TituloPagina from "./../../components/TituloPagina";
import {
  FALSE_PHP,
  TELA_INFORMACOES_PET,
  TIPO_ALERTA,
  TIPO_SUCESSO,
  TRUE_PHP,
} from "../../components/Constantes";
import { Badge } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";

function PetInformacao() {
  const { id } = useParams();
  const [pet, setPet] = useState([]);
  const [raca, setRaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [usuarioResponsavel, setUsuarioResponsavel] = useState([]);
  const [petFavoritado, setPetFavoritado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { token, isUsuarioLogado } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);

  useEffect(() => {
    verInformacaoPet(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function verInformacaoPet(idPet) {
    setIsLoading(true);

    const endpoint = isUsuarioLogado
      ? `pets/visualizar/${idPet}`
      : `pets/${idPet}`;

    const headerVerificado = isUsuarioLogado ? header : null;

    Api.get(endpoint, headerVerificado)
      .then(({ data }) => {
        setPet(data.pet);
        setRaca(data.raca.raca);
        setTipo(data.tipo.tipo);
        setUsuarioResponsavel(data.user);
        setPetFavoritado(data.pet_favoritado);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function favoritarPet(idPet) {
    setIsLoadingButton(true);

    Api.post(`pets/${idPet}/favoritar`, null, header)
      .then(() => {
        setPetFavoritado(true);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  function desfavoritarPet(idPet) {
    setIsLoadingButton(true);

    Api.post(`pets/${idPet}/desfavoritar`, null, header)
      .then(() => {
        setPetFavoritado(false);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  function formataTelaSemPrimeiraBarraEId(caminhoTela) {
    const partes = caminhoTela.split("/");
    let partesFormatadas = partes.filter((part) => !part.startsWith(":id"));
    partesFormatadas = partesFormatadas.join("/");
    partesFormatadas = partesFormatadas.replace(/^\//, "");
    partesFormatadas = partesFormatadas + "/";
    return partesFormatadas;
  }

  return (
    <>
      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-5">
            <div>
              <div className="text-center">
                {pet.flg_adotado === FALSE_PHP ? (
                  <Badge pill bg={TIPO_ALERTA} className="fs-4 text-dark mb-2">
                    Para adoção
                  </Badge>
                ) : (
                  <Badge pill bg={TIPO_SUCESSO} className="fs-4 text-dark mb-2">
                    Adotado
                  </Badge>
                )}
              </div>

              <img
                className="img-thumbnail mb-3"
                style={{ maxWidth: "350px" }}
                src={process.env.REACT_APP_API_URL + pet.imagem}
                alt={`foto pet ${pet.nome}`}
              />

              <p>Compartilhar</p>
              <a
                className="btn btn-secondary"
                href={`https://wa.me/?text=Olha que pet incrível: ${
                  process.env.REACT_APP_PUBLIC_URL +
                  formataTelaSemPrimeiraBarraEId(TELA_INFORMACOES_PET) +
                  pet.id
                }`}
              >
                <FaWhatsapp />
              </a>
            </div>

            <div>
              <TituloPagina titulo="Informações do Pet" />

              <div className="mb-2">
                {petFavoritado ? (
                  <button
                    className="btn btn-warning"
                    disabled={!isUsuarioLogado || isLoadingButton}
                    onClick={() => desfavoritarPet(pet.id)}
                  >
                    {isLoadingButton ? (
                      <CarregamentoBotao variant="dark" />
                    ) : (
                      <BsStarFill />
                    )}
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    disabled={!isUsuarioLogado || isLoadingButton}
                    onClick={() => favoritarPet(pet.id)}
                  >
                    {isLoadingButton ? (
                      <CarregamentoBotao variant="dark" />
                    ) : (
                      <BsStar />
                    )}
                  </button>
                )}
              </div>

              <p>
                <span className="fw-bold">Nome:</span> {pet.nome}
              </p>

              <p>
                <span className="fw-bold">Tipo:</span> {tipo}
              </p>
              <p>
                <span className="fw-bold">Raça:</span> {raca}
              </p>

              <p>
                <span className="fw-bold">Sexo:</span>{" "}
                {formataSexoPet(pet.sexo)}
              </p>

              <p>
                <span className="fw-bold">Tamanho:</span>{" "}
                {formataTamanhoPet(pet.tamanho, pet.sexo)}
              </p>

              <p>
                <span className="fw-bold">Idade:</span>{" "}
                {formataMostrandoIdade(pet.data_nascimento)}
              </p>

              <p>
                <span className="fw-bold">Responsável:</span>{" "}
                {usuarioResponsavel.primeiro_nome}
              </p>

              <p>
                <span className="fw-bold">Cidade:</span>{" "}
                {usuarioResponsavel.endereco_cidade}
              </p>

              <p>
                <span className="fw-bold">Estado:</span>{" "}
                {usuarioResponsavel.endereco_estado}
              </p>

              <p>
                <span className="fw-bold">País:</span>{" "}
                {usuarioResponsavel.endereco_pais}
              </p>

              {usuarioResponsavel.flg_celular_telefone === TRUE_PHP && (
                <p>
                  <span className="fw-bold">Telefone:</span>{" "}
                  {formataTelefone(usuarioResponsavel.telefone)}
                  <a
                    className="fw-bold btn btn-success ms-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://api.whatsapp.com/send?phone=55${
                      usuarioResponsavel.telefone
                    }&text=🐶 Olá, vim pelo ${
                      process.env.REACT_APP_PUBLIC_URL
                    } gostaria de saber mais sobre o pet com nome de ${
                      pet.nome
                    } que está para adoção. O link é ${
                      process.env.REACT_APP_PUBLIC_URL +
                      formataTelaSemPrimeiraBarraEId(TELA_INFORMACOES_PET) +
                      pet.id
                    }`}
                  >
                    <FaWhatsapp />
                  </a>
                </p>
              )}

              {usuarioResponsavel.telefone != null &&
                usuarioResponsavel.flg_telefone_whatsapp === FALSE_PHP && (
                  <p>
                    <span className="fw-bold">Telefone:</span>{" "}
                    {formataTelefone(usuarioResponsavel.telefone)}
                  </p>
                )}

              {usuarioResponsavel.flg_celular_whatsapp === TRUE_PHP && (
                <p>
                  <span className="fw-bold">Celular:</span>{" "}
                  {formataCelular(usuarioResponsavel.celular)}
                  <a
                    className="fw-bold btn btn-success ms-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://api.whatsapp.com/send?phone=55${
                      usuarioResponsavel.celular
                    }&text=🐶 Olá, vim pelo ${
                      process.env.REACT_APP_PUBLIC_URL
                    } gostaria de saber mais sobre o pet com nome de ${
                      pet.nome
                    } que está para adoção. O link é ${
                      process.env.REACT_APP_PUBLIC_URL +
                      formataTelaSemPrimeiraBarraEId(TELA_INFORMACOES_PET) +
                      pet.id
                    }`}
                  >
                    <BsWhatsapp />
                  </a>
                </p>
              )}

              {usuarioResponsavel.celular != null &&
                usuarioResponsavel.flg_celular_whatsapp === FALSE_PHP && (
                  <p>
                    <span className="fw-bold">Celular:</span>{" "}
                    {formataCelular(usuarioResponsavel.celular)}
                  </p>
                )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PetInformacao;
