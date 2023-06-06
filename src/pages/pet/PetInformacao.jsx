import { useContext, useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { MessageContext } from "../../contexts/MessageContext";
import Api from "../../services/Api";
import formataData from "../../utils/DataUtil";
import {
  formataCelular,
  formataSexoPet,
  formataTamanhoPet,
} from "../../utils/Mask";
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
              style={{ maxWidth: "300px" }}
              src={process.env.REACT_APP_API_URL + pet.imagem}
              alt={`foto pet ${pet.nome}`}
            />

            <div>
              <TituloPagina titulo="Informações do Pet" />

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
              <p>
                <span className="fw-bold">Contato:</span>{" "}
                {formataCelular(usuarioResponsavel.telefone)}
              </p>
              <div>
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
                    disabled={!isUsuarioLogado}
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PetInformacao;
