import { useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

function BtnVoltarTopo() {
    const [pageYPosition, setPageYPosition] = useState(0);

    function getPageYAfterScroll() {
        setPageYPosition(window.scrollY);
    }

    function voltarProTopo() {
        window.scrollTo(0, 0)
    }

    window.addEventListener("scroll", getPageYAfterScroll);

    return (
        <>
            {pageYPosition > 600 &&
                <FaArrowAltCircleUp
                    onClick={voltarProTopo}
                    style={{ position: "fixed", bottom: "20px", right: "20px", height: "40px", width: "40px", cursor: "pointer" }}
                    className="text-primary"
                    id="btnVoltarTopo" />
            }
        </>
    )
}

export default BtnVoltarTopo