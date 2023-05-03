import Spinner from 'react-bootstrap/Spinner';

function Carregamento() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner variant="warning" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}

export default Carregamento;