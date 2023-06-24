import { NavLink } from "react-router-dom";

/**
 * Esse componente será um NavLink
 * da biblioteca react-router-dom
 * porém customizado, com o comportamente
 * após ser acionado ir para o topo da página
 * @since 04/06/2023 11:35:57
 * @author Leonardo Aragão
 */
export default function NavLinkToTop({
  to,
  className,
  title,
  children,
  disabled,
}) {
  function irProTopo() {
    window.scrollTo(0, 0);
  }

  return (
    <NavLink
      disabled={disabled == null ? false : disabled === "false" ? false : true}
      to={to}
      className={className}
      title={title}
      onClick={irProTopo}
    >
      {children}
    </NavLink>
  );
}
