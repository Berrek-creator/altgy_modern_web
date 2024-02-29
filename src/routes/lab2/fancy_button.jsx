import './fancy_button.css'

function FancyButton(props) {

    function do_the_thing(e)  {
        e.target.style.left = (Math.random() * 300) + "px",
        e.target.style.top = (Math.random() * 300) + "px"
    };

    return <button onClick={props.onClick} 
                    onMouseOver={props.onMouseOver ? props.onMouseOver : props.className && props.className.includes("strange") ? do_the_thing : () => {}} 
                    className={props.className} 
                    id={props.id} 
                    value={props.value} 
                    type={props.type ? props.type : "button"}>{props.children}</button>
}

export default FancyButton