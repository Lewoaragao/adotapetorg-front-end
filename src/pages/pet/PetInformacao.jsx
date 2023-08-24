import { useContext, useEffect, useState } from "react";
import { BsStar, BsStarFill, BsWhatsapp } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import {
  formataCelular,
  formataSexoPet,
  formataTamanhoPet,
} from "../../utils/Mask";
import formataData from "../../utils/Util";
import CarregamentoTela, {
  CarregamentoBotao,
} from "./../../components/Carregamento";
import TituloPagina from "./../../components/TituloPagina";

function PetInformacao() {
  const { id } = useParams();
  const [pet, setPet] = useState([]);
  const [usuarioResponsavel, setUsuarioResponsavel] = useState([]);
  const [petFavoritado, setPetFavoritado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { token, isUsuarioLogado } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);

  useEffect(() => {
    isUsuarioLogado
      ? verInformacaoPetUserAuth(id, token)
      : verInformacaoPet(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function verInformacaoPet(idPet) {
    setIsLoading(true);
    Api.get(`pets/${idPet}`)
      .then(({ data }) => {
        setPet(data.pet);
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

  function verInformacaoPetUserAuth(idPet, token) {
    setIsLoading(true);
    Api.post(`pets/visualizar/${idPet}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setPet(data.pet);
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
    Api.post(`pets/${idPet}/favoritar`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
    Api.post(`pets/${idPet}/desfavoritar`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

  return (
    <>
      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-5">
            <img
              className="img-thumbnail"
              style={{ maxWidth: "350px" }}
              src={process.env.REACT_APP_API_URL + pet.imagem}
              alt={`foto pet ${pet.nome}`}
            />

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
                <span className="fw-bold">Sexo:</span>{" "}
                {formataSexoPet(pet.sexo)}
              </p>

              <p>
                <span className="fw-bold">Tamanho:</span>{" "}
                {formataTamanhoPet(pet.tamanho, pet.sexo)}
              </p>

              <p>
                <span className="fw-bold">Data de nascimento:</span>{" "}
                {formataData(pet.data_nascimento)}
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

              {usuarioResponsavel.flg_celular_telefone && (
                <p>
                  <span className="fw-bold">Celular:</span>{" "}
                  {formataCelular(usuarioResponsavel.celular)}
                  <a
                    className="fw-bold btn btn-success ms-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://api.whatsapp.com/send?phone=55${usuarioResponsavel.telefone}&text=Ol%C3%A1,%20vim%20pelo%20${process.env.REACT_APP_PUBLIC_URL}%20gostaria%20de%20saber%20mais%20sobre%20o%20pet%20${pet.nome}%20que%20est%C3%A1%20para%20ado%C3%A7%C3%A3o.`}
                  >
                    <BsWhatsapp />
                  </a>
                </p>
              )}

              {usuarioResponsavel.flg_celular_whatsapp ? (
                <p>
                  <span className="fw-bold">Celular:</span>{" "}
                  {formataCelular(usuarioResponsavel.celular)}
                  <a
                    className="fw-bold btn btn-success ms-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://api.whatsapp.com/send?phone=${usuarioResponsavel.celular}&text=Ol%C3%A1,%20vim%20pelo%20${process.env.REACT_APP_PUBLIC_URL}%20gostaria%20de%20saber%20mais%20sobre%20o%20pet%20${pet.nome}%20que%20est%C3%A1%20para%20ado%C3%A7%C3%A3o.`}
                  >
                    <BsWhatsapp />
                  </a>
                </p>
              ) : (
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
