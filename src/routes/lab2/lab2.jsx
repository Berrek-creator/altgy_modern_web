import FancyButton from "./fancy_button"

function Lab2() {
    return (
        <div>
            <h2>Лабораторная работа №2</h2>
            <FancyButton onClick={(e) => alert("Привет от странной кнопки")} 
            value="Кнопочка"
            className='fbtn btn-success strange'
            >Странная кнопочка</FancyButton>
        </div>
    )
}

export default Lab2