import { Link } from "react-router-dom";
import FancyButton from "../routes/lab2/FancyButton";

import { ThemeContext } from "../ThemeContext";
import { useState, useContext } from "react";

function Navbar() {
    const [showSidebar, toggleSidebar] = useContext(ThemeContext).sidebar

    return(
        <nav>
            <div className="nav-left">
                <Link className="nav-item" to={"/"}>Главная</Link>
                <Link className="nav-item" to={"/about"}>Об авторе</Link>
            </div>
            <div className="nav-right">
                <FancyButton className="fbtn" onClick={toggleSidebar}></FancyButton>
            </div>
        </nav>
    )
}

export default Navbar