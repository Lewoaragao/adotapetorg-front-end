import Item from "./Item"

function List() {
    return (
        <>
            <h1>Minha lista</h1>
            <ul>
                {/* <li>Item 1</li>
                <li>Item 2</li> */}
                <Item marca="Ferrari" anoLancamento={1985}/>
                <Item marca="Fiat" anoLancamento={1964}/>
                <Item marca="Renault" anoLancamento={1943}/>
                <Item />
            </ul>
        </>
    )
}

export default List