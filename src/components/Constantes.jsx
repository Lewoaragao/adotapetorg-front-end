/**
 * Aqui ficarão as contantes
 * que vão se repetir no sistema
 * @since 21/05/2023 17:47:03
 */

/**
 * Mapeando rotas do front-end
 */
// ROTAS GERAL
export const TELA_INICIAL = "/";
export const TELA_SOBRE = "/sobre";
export const TELA_POLITICA_PRIVACIDADE = "/politica/privacidade";
// ROTAS USUÁRIO
export const TELA_CADASTRO_USUARIO = "/cadastrar/usuario";
export const TELA_USUARIO_ENTRAR = "/usuario/entrar";
export const TELA_EDITAR_PERFIL_USUARIO = "/usuario/editar/perfil";
export const TELA_VISUALIZAR_PERFIL_USUARIO = "/usuario/:usuario";
// ROTAS PET
export const TELA_TODOS_PET = "/todos/pets";
export const TELA_INFORMACOES_PET = "/informacoes/pet/:id";
export const TELA_PETS_USUARIO_LOGADO = "/meus/pets";
export const TELA_PETS_USUARIO_LOGADO_FAVORITOS = "/pets/favoritos";
// ROTAS LINK
export const TELA_MEUS_LINKS = "/meus/links";
export const TELA_LINKS = "/link/:nomeUsuario";
// ROTAS BLOG
export const TELA_BLOG = "/blog";
export const TELA_BLOG_POSTAGEM = "/blog/postagem/:slug";
export const TELA_BLOG_POSTAGEM_USUARIO_LOGADO = "/minhas/postagens";
export const TELA_BLOG_POSTAGEM_USUARIO_LOGADO_FAVORITOS =
  "/postagens/favoritas";
// ROTAS ERRO
export const TELA_ERRO_404 = "/*";

/**
 * Constante fazendo referencia ao back-end em PHP
 * para true é necessário enviar 1
 */
export const TRUE_PHP = 1;

/**
 * Constante fazendo referencia ao back-end em PHP
 * para false é necessário enviar 0
 */
export const FALSE_PHP = 0;

/**
 * Back-end
 * Constantes link tipos
 */
export const LINK_TIPO_SELECIONE_UM_LINK = 0;
export const LINK_TIPO_EXTERNO = 1;
export const LINK_TIPO_INSTAGRAM = 2;
export const LINK_TIPO_TIK_TOK = 3;
export const LINK_TIPO_LINKEDIN = 4;
export const LINK_TIPO_GITHUB = 5;
export const LINK_TIPO_FACEBOOK = 6;
export const LINK_TIPO_YOUTUBE = 7;

/**
 * Tipos de texto baseados
 * nas classes do bootstrap
 */
export const TIPO_SUCESSO = "success";
export const TIPO_ALERTA = "warning";
export const TIPO_ERRO = "danger";

/**
 * Tipos de mensagem de
 * nenhum item cadastrado
 * pelo usuário
 */
export const MENSAGEM_NENHUM_LINK_CADASTRADO = "Nenhum link cadastrado";
export const MENSAGEM_NENHUMA_POSTAGEM_CADASTRADA =
  "Nenhuma postagem cadastrada";
export const MENSAGEM_NENHUM_PET_CADASTRADO = "Nenhum pet cadastrado";

/**
 * Tipos de mensagem de
 * nenhum item favoritado
 * pelo usuário
 */
export const MENSAGEM_NENHUMA_POSTAGEM_FAVORITADA =
  "Nenhuma postagem favoritada";
export const MENSAGEM_NENHUM_PET_FAVORITADO = "Nenhum pet favoritado";

// MAPEANDO TIPOS DE LOGIN
export const LOGIN_EXTERNO_TIPO_GOOGLE = 1;

// IBGE
export const ID_PAIS_BRASIL = "23";
export const PAIS_BRASIL = "Brasil";

// PAGINAÇÃO
export const REGISTROS_PAGINACAO = 12;
