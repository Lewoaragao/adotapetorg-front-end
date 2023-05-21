import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

function BtnVoltarTopo() {
  const [pageYPosition, setPageYPosition] = useState(0);

  function getPageYAfterScroll() {
    setPageYPosition(window.scrollY);
  }

  function voltarProTopo() {
    window.scrollTo(0, 0);
  }

  window.addEventListener("scroll", getPageYAfterScroll);

  return (
    <div>
      {pageYPosition > 600 && (
        <FaArrowAltCircleUp
          onClick={voltarProTopo}
          className="btn btn-secondary fs-1 p-2 fixed-bottom ms-3 mb-3"
        />
      )}
    </div>
  );
}

export default BtnVoltarTopo;
