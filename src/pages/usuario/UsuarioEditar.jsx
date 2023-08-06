import { useEffect, useContext, useState } from "react";
import Api from "../../services/Api";
import TituloPagina from "./../../components/TituloPagina";
import { AuthContext } from "./../../contexts/AuthContext";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Image,
  Modal,
} from "react-bootstrap";
import { MessageContext } from "../../contexts/MessageContext";
import CarregamentoTela, {
  CarregamentoBotao,
} from "./../../components/Carregamento";
import {
  ID_PAIS_BRASIL,
  PAIS_BRASIL,
  TIPO_SUCESSO,
  TRUE_PHP,
} from "../../components/Constantes";
import { formataCelular, formataTelefone } from "../../utils/Mask";
import { obterSomenteNumeros } from "../../utils/Util";

/**
 * Página de edição de perfil do usuário
 * @since 05/08/2023  15:42:27
 * @author Leonardo Aragão
 */
export default function UsuarioEditar() {
  const { token, usuarioLogado, setUsuarioLogado } = useContext(AuthContext);
  const { setarMensagem } = useContext(MessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelect, setIsLoadingSelect] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [usuario, setUsuario] = useState(usuarioLogado.usuario);
  const [primeiroNome, setPrimeiroNome] = useState(usuarioLogado.primeiro_nome);
  const [sobrenome, setSobrenome] = useState(usuarioLogado.sobrenome);
  const [email, setEmail] = useState(usuarioLogado.email);
  const [isPessoa, setIsPessoa] = useState(usuarioLogado.is_pessoa);
  const [siglaOrganizacao, setSiglaOrganizacao] = useState(
    usuarioLogado.sigla_organizacao == null
      ? ""
      : usuarioLogado.sigla_organizacao
  );
  const [nomeOrganizacao, setNomeOrganizacao] = useState(
    usuarioLogado.nome_organizacao == null ? "" : usuarioLogado.nome_organizacao
  );
  const [imagem, setImagem] = useState("");
  const [idPais, setIdPais] = useState(
    usuarioLogado.id_pais == null ? ID_PAIS_BRASIL : usuarioLogado.id_pais
  );
  const [pais, setPais] = useState(
    usuarioLogado.endereco_pais == null
      ? PAIS_BRASIL
      : usuarioLogado.endereco_pais
  );
  const [idEstado, setIdEstado] = useState(
    usuarioLogado.id_estado == null ? "" : usuarioLogado.id_estado
  );
  const [estado, setEstado] = useState(
    usuarioLogado.endereco_estado == null ? "0" : usuarioLogado.endereco_estado
  );
  const [idCidade, setIdCidade] = useState(
    usuarioLogado.id_cidade == null ? "" : usuarioLogado.id_cidade
  );
  const [cidade, setCidade] = useState(
    usuarioLogado.endereco_cidade == null ? "0" : usuarioLogado.endereco_cidade
  );
  const [listaPaises, setListaPaises] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);
  const [listaCidades, setListaCidades] = useState([]);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [telefone, setTelefone] = useState(
    usuarioLogado.telefone == null ? "" : usuarioLogado.telefone
  );
  const [celular, setCelular] = useState(
    usuarioLogado.celular == null ? "" : usuarioLogado.celular
  );
  const [flgTelefoneIsWhatsapp, setFlgTelefoneIsWhatsapp] = useState(
    usuarioLogado.flg_telefone_whatsapp === TRUE_PHP ? true : false
  );
  const [flgCelularIsWhatsapp, setFlgCelularIsWhatsapp] = useState(
    usuarioLogado.flg_celular_whatsapp === TRUE_PHP ? true : false
  );
  const [abrirModalEditarImagem, setAbrirModalEditarImagem] = useState(false);

  useEffect(() => {
    consultarListaPaisesIBGE();
    consultarListaEstadosIBGE();
    consultarListaCidadesIBGE(
      usuarioLogado.id_estado == null ? null : usuarioLogado.id_estado
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function consultarListaPaisesIBGE() {
    setIsLoading(true);
    Api.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome"
    )
      .then(({ data }) => {
        setListaPaises(data);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function consultarListaEstadosIBGE() {
    // function consultarListaEstadosIBGE(idPais) {
    setIsLoadingSelect(true);
    Api.get(
      // `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idPais}?orderBy=nome`
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`
    )
      .then(({ data }) => {
        setListaEstados(data);
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoadingSelect(false);
      });
  }

  function consultarListaCidadesIBGE(idEstado) {
    if (idEstado !== null) {
      setIsLoadingSelect(true);
      Api.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/distritos?orderBy=nome`
      )
        .then(({ data }) => {
          setListaCidades(data);
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          setIsLoadingSelect(false);
        });
    }
  }

  function handleSelectPais(e) {
    let paisSelecionado = e.target.value;
    setPais(paisSelecionado);
    // consultarListaEstadosIBGE(idPaisSelecionado);
  }

  function handleSelectEstado(e) {
    const estadoSelecionado =
      e.currentTarget.options[e.currentTarget.selectedIndex];
    setEstado(estadoSelecionado.value);
    setIdEstado(estadoSelecionado.dataset.id);
    consultarListaCidadesIBGE(estadoSelecionado.dataset.id);
  }

  function handleSelectCidade(e) {
    const cidadeSelecionada =
      e.currentTarget.options[e.currentTarget.selectedIndex];
    setCidade(cidadeSelecionada.value);
    setIdCidade(cidadeSelecionada.dataset.id);
  }

  function handleSelectIsPessoa(e) {
    const isPessoaSelecionada = e.target.id;
    if (isPessoaSelecionada === "tipoUsuarioPessoa") {
      setIsPessoa(true);
      setSiglaOrganizacao("");
      setNomeOrganizacao("");
    } else {
      setIsPessoa(false);
      setPrimeiroNome("");
      setSobrenome("");
    }
  }

  function removerImagemUser() {
    setIsLoading(true);
    Api.post(`users/deletar/imagem/${usuarioLogado.id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        setarMensagem(data.message, TIPO_SUCESSO);
        usuarioLogado.imagem = data.imagem;
      })
      .catch(({ response }) => {
        setarMensagem(response.data.message, null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function validaCamposAtualizaImagem() {
    if (imagem === "" || imagem === null) {
      setarMensagem("Selecione uma imagem", null);
      return false;
    }

    return true;
  }

  function editarImagem() {
    window.scrollTo(0, 0);

    if (validaCamposAtualizaImagem()) {
      setIsLoadingButton(true);
      Api.post(
        `users/atualizar/imagem/${usuarioLogado.id}`,
        {
          imagem: imagem,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then(({ data }) => {
          setarMensagem(data.message, TIPO_SUCESSO);
          usuarioLogado.imagem = data.imagem;
          limparCampos();
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          setIsLoadingButton(false);
        });
    }
  }

  function validaCampos() {
    if (usuario === "" || usuario === null) {
      setarMensagem("Preencha o campo usuário", null);
      return false;
    }

    if (isPessoa && (primeiroNome === "" || primeiroNome === null)) {
      setarMensagem("Preencha a campo primeiro nome", null);
      return false;
    }

    if (isPessoa && (sobrenome === "" || sobrenome === null)) {
      setarMensagem("Preencha a campo sobrenome", null);
      return false;
    }

    if (!isPessoa && (siglaOrganizacao === "" || siglaOrganizacao === null)) {
      setarMensagem("Preencha a campo sigla organização", null);
      return false;
    }

    if (!isPessoa && (nomeOrganizacao === "" || nomeOrganizacao === null)) {
      setarMensagem("Preencha a campo nome organização", null);
      return false;
    }

    if (email === "" || email === null) {
      setarMensagem("Preencha o campo email", null);
      return false;
    }

    if (
      (telefone === "" || telefone === null) &&
      (celular === "" || celular === null)
    ) {
      setarMensagem(
        "Necessário um número para contato, preencha o telefone ou celular",
        null
      );
      return false;
    }

    if (
      telefone !== usuarioLogado.telefone &&
      telefone !== null &&
      telefone !== "" &&
      telefone.length > 0 &&
      telefone.length < 9
    ) {
      setarMensagem("Telefone inválido", null);
      return false;
    }

    if (
      celular !== usuarioLogado.celular &&
      celular !== null &&
      celular !== "" &&
      celular.length > 0 &&
      celular.length < 15
    ) {
      setarMensagem("Celular inválido", null);
      return false;
    }

    if (estado === "" || estado === null || estado === "0") {
      setarMensagem("Selecione um estado", null);
      return false;
    }

    if (cidade === "" || cidade === null || cidade === "0") {
      setarMensagem("Selecione uma cidade", null);
      return false;
    }

    return true;
  }

  function atualizarPerfil() {
    if (validaCampos()) {
      setIsLoadingButton(true);
      setIdUser(usuarioLogado.id);
      setIdPais(ID_PAIS_BRASIL);
      setPais(PAIS_BRASIL);

      Api.post(
        `users/atualizar/${idUser}`,
        {
          user_id: idUser,
          usuario: usuario,
          is_pessoa: isPessoa,
          primeiro_nome: isPessoa ? primeiroNome : null,
          sobrenome: isPessoa ? sobrenome : null,
          nome_organizacao: isPessoa ? null : nomeOrganizacao,
          sigla_organizacao: isPessoa ? null : siglaOrganizacao,
          email: email,
          telefone: obterSomenteNumeros(telefone),
          flg_telefone_whatsapp: flgTelefoneIsWhatsapp,
          celular: obterSomenteNumeros(celular),
          flg_celular_whatsapp: flgCelularIsWhatsapp,
          id_pais: idPais,
          endereco_pais: pais,
          id_estado: idEstado,
          endereco_estado: estado,
          id_cidade: idCidade,
          endereco_cidade: cidade,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(({ data }) => {
          setarMensagem(data.message, TIPO_SUCESSO);
          setUsuarioLogado(data.user);
          limparCampos();
        })
        .catch(({ response }) => {
          setarMensagem(response.data.message, null);
        })
        .finally(() => {
          setIsLoadingButton(false);
        });
    }
  }

  function limparCampos() {
    setAbrirModalEditarImagem(false);
  }

  return (
    <>
      {isLoading ? (
        <CarregamentoTela />
      ) : (
        <div div style={{ maxWidth: "600px" }} className="mx-auto">
          <TituloPagina titulo="Editar perfil" />

          <div className="text-center">
            <Image
              width="200px"
              height="200px"
              className="mb-3 me-3"
              roundedCircle
              src={
                usuarioLogado.imagem.includes("https")
                  ? usuarioLogado.imagem
                  : process.env.REACT_APP_API_URL + usuarioLogado.imagem
              }
              alt={`Foto do usuário ${
                usuarioLogado.is_pessoa
                  ? usuarioLogado.primeiro_nome
                  : usuarioLogado.sigla_organizacao
              }`}
            />

            <ButtonGroup vertical className="mb-3">
              <Button
                variant="warning"
                onClick={() => {
                  let result = window.confirm(
                    "Confirma a ação REMOVER IMAGEM?"
                  );
                  if (result) removerImagemUser();
                }}
              >
                Remover Imagem
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  setImagem("");
                  setAbrirModalEditarImagem(true);
                }}
              >
                Atualizar Imagem
              </Button>
            </ButtonGroup>
          </div>

          <FormGroup className="mb-3">
            <Form.Label className="fw-bold" htmlFor="usuario">
              Usuário <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              id="usuario"
              type="text"
              placeholder="Digite o nome de usuário"
              value={usuario}
              required
              autoFocus
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="off"
            />
          </FormGroup>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold me-3">
              Tipo de usuário <span className="text-danger">*</span>
            </Form.Label>

            <Form.Check
              inline
              type="radio"
              name="tipoUsuario"
              id="tipoUsuarioPessoa"
              label="Sou pessoa"
              checked={isPessoa}
              onChange={handleSelectIsPessoa}
            />

            <Form.Check
              inline
              type="radio"
              name="tipoUsuario"
              id="tipoUsuarioOrganizacao"
              label="Sou organização"
              checked={!isPessoa}
              onChange={handleSelectIsPessoa}
            />
          </Form.Group>

          {isPessoa ? (
            <>
              <FormGroup className="mb-3">
                <Form.Label className="fw-bold" htmlFor="primeiroNome">
                  Primeiro Nome <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  id="primeiroNome"
                  type="text"
                  placeholder="Digite seu primeiro nome"
                  value={primeiroNome}
                  required
                  onChange={(e) => setPrimeiroNome(e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>

              <FormGroup className="mb-3">
                <Form.Label className="fw-bold" htmlFor="sobrenome">
                  Sobrenome <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  id="sobrenome"
                  type="text"
                  placeholder="Digite seu sobrenome"
                  value={sobrenome}
                  required
                  onChange={(e) => setSobrenome(e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup className="mb-3">
                <Form.Label className="fw-bold" htmlFor="siglaOrganizacao">
                  Sigla Organização <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  id="siglaOrganizacao"
                  type="text"
                  placeholder="Digite a sigla da sua organização"
                  value={siglaOrganizacao}
                  required
                  onChange={(e) => setSiglaOrganizacao(e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>

              <FormGroup className="mb-3">
                <Form.Label className="fw-bold" htmlFor="nomeOrganizacao">
                  Nome Organização <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  id="nomeOrganizacao"
                  type="text"
                  placeholder="Digite o nome da sua organização"
                  value={nomeOrganizacao}
                  required
                  onChange={(e) => setNomeOrganizacao(e.target.value)}
                  autoComplete="off"
                />
              </FormGroup>
            </>
          )}

          <FormGroup className="mb-3">
            <Form.Label className="fw-bold" htmlFor="email">
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Digite seu melhor email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Form.Label className="fw-bold" htmlFor="telefone">
              Telefone
            </Form.Label>
            <Form.Control
              id="telefone"
              type="tel"
              placeholder="Digite seu telefone"
              value={formataTelefone(telefone)}
              onChange={(e) => setTelefone(e.target.value)}
              autoComplete="off"
              minLength="9"
              maxLength="9"
            />
          </FormGroup>

          {telefone !== null && telefone.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold me-3">
                Telefone é WhatsApp? <span className="text-danger">*</span>
              </Form.Label>

              <Form.Check
                inline
                type="radio"
                name="telefoneIsWhatsapp"
                id="telefoneIsWhatsapp"
                label="Sim"
                checked={flgTelefoneIsWhatsapp}
                onChange={(e) =>
                  setFlgTelefoneIsWhatsapp(e.target.id === "telefoneIsWhatsapp")
                }
              />

              <Form.Check
                inline
                type="radio"
                name="telefoneIsWhatsapp"
                id="telefoneNotIsWhatsapp"
                label="Não"
                checked={!flgTelefoneIsWhatsapp}
                onChange={(e) =>
                  setFlgTelefoneIsWhatsapp(e.target.id === "telefoneIsWhatsapp")
                }
              />
            </Form.Group>
          )}

          <FormGroup className="mb-3">
            <Form.Label className="fw-bold" htmlFor="celular">
              Celular
            </Form.Label>

            <Form.Control
              id="celular"
              type="tel"
              placeholder="Digite seu celular"
              value={formataCelular(celular)}
              onChange={(e) => {
                setCelular(e.target.value);
                if (celular.length <= 1) setFlgCelularIsWhatsapp(false);
              }}
              autoComplete="off"
              minLength="15"
              maxLength="15"
            />
          </FormGroup>

          {celular !== null && celular.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold me-3">
                Celular é Whatsapp? <span className="text-danger">*</span>
              </Form.Label>

              <Form.Check
                inline
                type="radio"
                name="celularIsWhatsapp"
                id="celularIsWhatsapp"
                label="Sim"
                checked={flgCelularIsWhatsapp}
                onChange={(e) =>
                  setFlgCelularIsWhatsapp(e.target.id === "celularIsWhatsapp")
                }
              />

              <Form.Check
                inline
                type="radio"
                name="celularIsWhatsapp"
                id="celularNotIsWhatsapp"
                label="Não"
                checked={!flgCelularIsWhatsapp}
                onChange={(e) =>
                  setFlgCelularIsWhatsapp(e.target.id === "celularIsWhatsapp")
                }
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="pais">
              País <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              onChange={handleSelectPais}
              value={pais}
              id="pais"
              disabled
            >
              <option value="0" className="fw-bold" selected disabled>
                Selecione um país
              </option>

              {listaPaises.map((pais) => (
                <option
                  key={pais.id.M49}
                  value={pais.nome}
                  name={pais.nome}
                  // onClick={() => consultarListaEstadosIBGE(pais.id)}
                >
                  {pais.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="estado">
              Estado <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              onChange={(e) => handleSelectEstado(e)}
              value={estado}
              disabled={pais.length <= 1}
              id="estado"
            >
              {pais.length <= 1 ? (
                <option id="0" value="0" className="fw-bold" selected disabled>
                  Selecione um país
                </option>
              ) : (
                <option id="0" value="0" className="fw-bold" selected disabled>
                  Selecione um estado
                </option>
              )}

              {listaEstados.map((estado) => (
                <option
                  data-id={estado.id}
                  key={estado.id}
                  value={estado.nome}
                  name={estado.nome}
                >
                  {estado.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold" htmlFor="cidade">
              Cidade <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              onChange={(e) => handleSelectCidade(e)}
              value={cidade}
              disabled={estado.length <= 1}
              id="cidade"
            >
              {estado.length <= 1 ? (
                <option value="0" className="fw-bold" selected disabled>
                  Selecione um estado
                </option>
              ) : (
                <option value="0" className="fw-bold" selected disabled>
                  Selecione uma cidade
                </option>
              )}

              {isLoadingSelect
                ? "Carregando cidades..."
                : listaCidades.map((cidade) => (
                    <option
                      data-id={cidade.id}
                      key={cidade.id}
                      value={cidade.nome}
                      name={cidade.nome}
                    >
                      {cidade.nome}
                    </option>
                  ))}
            </Form.Select>
          </Form.Group>

          <Button variant="success" onClick={atualizarPerfil}>
            {isLoadingButton ? <CarregamentoBotao /> : "Atualizar"}
          </Button>

          {/* MODAL PARA EDITAR IMAGEM PET */}
          <Modal show={abrirModalEditarImagem} onHide={limparCampos}>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold text-primary">
                Atualizar imagem
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold" htmlFor="imagem">
                  Imagem
                </Form.Label>
                <Form.Control
                  id="imagem"
                  type="file"
                  onChange={(e) => setImagem(e.target.files[0])}
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={limparCampos}>
                Cancelar
              </Button>
              <Button variant="success" onClick={editarImagem}>
                {isLoadingButton ? <CarregamentoBotao /> : "Editar"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}
