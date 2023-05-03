import { useEffect } from 'react'

function TituloPagina({ titulo }) {
    useEffect(() => {
        document.title = `${titulo} - ${process.env.REACT_APP_SITE_TITLE}`;
    }, [titulo]);

    return (
        <h1 className="fw-bold">{titulo}</h1>
    );
}

export default TituloPagina