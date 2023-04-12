import PropTypes from 'prop-types'

// function Item(props) {
function Item({marca, anoLancamento}) {
    return (
        <>
            {/* <li>{props.marca} - {props.lancamento}</li> */}
            <li>{marca} - {anoLancamento}</li>
        </>
    )
}

Item.propTypes = {
    marca: PropTypes.string.isRequired,
    anoLancamento: PropTypes.number.isRequired
}

Item.defaultProps = {
    marca: 'Faltou a marca',
    anoLancamento: 0
}

export default Item