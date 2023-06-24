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
export const TELA_BLOG = "/blog";
export const TELA_POLITICA_PRIVACIDADE = "/politica/privacidade";
// ROTAS USUÁRIO
export const TELA_CADASTRO_USUARIO = "/cadastrar/usuario";
export const TELA_USUARIO_ENTRAR = "/usuario/entrar";
// ROTAS PET
export const TELA_CADASTRO_PET = "/cadastrar/pet";
export const TELA_INFORMACOES_PET = "/informacoes/pet/:id";
export const TELA_PETS_USUARIO_LOGADO = "/meus/pets";
export const TELA_PETS_USUARIO_LOGADO_FAVORITOS = "/pets/favoritos";
// ROTAS LINK
export const TELA_MEUS_LINKS = "/meus/links";
export const TELA_LINKS = "/link/:nomeUsuario";
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
export const LINK_TIPO_EXTERNO = 1;
export const LINK_TIPO_INSTAGRAM = 2;
export const LINK_TIPO_TIK_TOK = 3;
export const LINK_TIPO_LINKEDIN = 4;
export const LINK_TIPO_GITHUB = 5;
export const LINK_TIPO_FACEBOOK = 6;
export const LINK_TIPO_YOUTUBE = 7;

/**
 * Tipos de mensagem baseados
 * nas classes do bootstrap
 */
export const MENSAGEM_TIPO_SUCESSO = "success";
export const MENSAGEM_TIPO_ALERTA = "warning";
export const MENSAGEM_TIPO_ERRO = "danger";
