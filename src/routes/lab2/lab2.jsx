import FancyButton from "./fancy_button"

function Lab2() {
    return (
        <div>
            <h2>Лабораторная работа №2</h2>
            <h3>Данная кнопка (в обычном виде) встречается в первой лабораторной</h3>
            <FancyButton onClick={() => alert("Привет от странной кнопки")} 
            value="Кнопочка"
            className='fbtn fbtn-success strange'
            >Странная кнопочка</FancyButton>
        </div>
    )
}

export default Lab2