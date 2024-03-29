import { Link } from "react-router-dom";
import FancyButton from "../routes/lab2/FancyButton";

import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

function Navbar() {
    const [is_open, toggleSidebar] = useContext(ThemeContext).sidebar

    return(
        <nav>
            <div className="nav-left">
                <Link className="nav-item" to={"/"}>Главная</Link>
                <Link className="nav-item" to={"/about"}>Об авторе</Link>
            </div>
            <div className="nav-right">
                {!is_open ? 
                    <FancyButton className="fbtn fbtn-success" onClick={toggleSidebar}>
                        {is_open ? <FaArrowRight></FaArrowRight> : <FaArrowLeft></FaArrowLeft>}
                    </FancyButton>
                : _ }     
            </div>
        </nav>
    )
}

export default Navbar