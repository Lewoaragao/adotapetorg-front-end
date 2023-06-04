import { useContext, useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import Mensagem from "../../components/mensagem/Mensagem";
import { AuthContext } from "../../contexts/AuthContext";
import Api from "../../services/Api";
import formataData from "../../utils/DataUtil";
import {
  formataCelular,
  formataSexoPet,
  formataTamanhoPet,
} from "../../utils/Mask";
import Carregamento, {
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
  const [msg, setMsg] = useState("");
  const [msgTipo, setMsgTipo] = useState("");

  useEffect(() => {
    verInformacaoPet(id);
  }, [id]);

  function verInformacaoPet(idPet) {
    setIsLoading(true);
    Api.get(`pets/${idPet}`)
      .then(({ data }) => {
        setPet(data.pet);
        setUsuarioResponsavel(data.user);
        setPetFavoritado(data.pet_favoritado);
      })
      .catch(({ response }) => {
        setMsgTipo("warning");
        setMsg(response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function favoritarPet(idPet) {
    setIsLoadingButton(true);
    setPetFavoritado(true);
    Api.post(`pets/${idPet}/favoritar`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .catch(({ response }) => {
        setMsgTipo("warning");
        setMsg(response.data.message);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  function desfavoritarPet(idPet) {
    setIsLoadingButton(true);
    setPetFavoritado(false);
    Api.post(`pets/${idPet}/desfavoritar`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .catch(({ response }) => {
        setMsgTipo("warning");
        setMsg(response.data.message);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  }

  return (
    <>
      <Mensagem mensagem={msg} mensagemTipo={msgTipo} />

      {isLoading ? (
        <Carregamento />
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
                    disabled={!isUsuarioLogado}
                    onClick={() => desfavoritarPet(pet.id)}
                  >
                    {isLoadingButton ? <CarregamentoBotao /> : <BsStarFill />}
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    disabled={!isUsuarioLogado}
                    onClick={() => favoritarPet(pet.id)}
                  >
                    {isLoadingButton ? <CarregamentoBotao /> : <BsStar />}
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
