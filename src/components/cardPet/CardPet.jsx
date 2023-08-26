import { Badge, Card, Col } from "react-bootstrap";
import { AiFillIdcard, AiOutlineInfoCircle } from "react-icons/ai";
import { BsCalendarEvent, BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { RxSize } from "react-icons/rx";
import { FALSE_PHP, TIPO_ALERTA, TIPO_SUCESSO } from "../Constantes";
import NavLinkToTop from "../navLinkToTop/NavLinkToTop";
import {
  formataMostrandoIdade,
  formataPrimeiroNome,
  formataSexoPet,
  formataTamanhoPet,
} from "../../utils/Mask";

/**
 * Utilizado para mostrar
 * na lista o pet passado
 * por parâmetro
 * @since 13/08/2023 09:03:15
 * @author Leonardo Aragão
 */
export default function CardPet({ pet }) {
  return (
    <NavLinkToTop
      className="text-decoration-none card-hover"
      to={`/informacoes/pet/${pet.id}`}
    >
      <Col>
        <Card>
          <div className="image-container">
            <Card.Img
              variant="top"
              src={process.env.REACT_APP_API_URL + pet.imagem}
              alt={`Foto do pet ${pet.nome}`}
            />
          </div>
          <Card.Body>
            <Card.Title>
              {pet.flg_adotado === FALSE_PHP ? (
                <Badge pill bg={TIPO_ALERTA} className="text-dark mb-2">
                  Para adoção
                </Badge>
              ) : (
                <Badge pill bg={TIPO_SUCESSO} className="text-dark mb-2">
                  Adotado
                </Badge>
              )}
              <br />
              <AiFillIdcard /> {formataPrimeiroNome(pet.nome)}{" "}
              {pet.apelido !== null && `(${pet.apelido})`}
            </Card.Title>
            <Card.Text>
              <RxSize /> {formataTamanhoPet(pet.tamanho, pet.sexo)} <br />
              <span
                className={pet.sexo === "M" ? "text-primary" : "text-danger"}
              >
                {pet.sexo === "M" ? <BsGenderMale /> : <BsGenderFemale />}{" "}
                {formataSexoPet(pet.sexo)}
              </span>{" "}
              <br />
              <BsCalendarEvent /> {formataMostrandoIdade(
                pet.data_nascimento
              )}{" "}
              <br />
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <NavLinkToTop
              className="btn btn-primary d-flex justify-content-center align-items-center gap-1"
              to={`/informacoes/pet/${pet.id}`}
            >
              <AiOutlineInfoCircle /> Info
            </NavLinkToTop>
          </Card.Footer>
        </Card>
      </Col>
    </NavLinkToTop>
  );
}
