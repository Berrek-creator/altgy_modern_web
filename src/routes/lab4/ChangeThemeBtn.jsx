import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

import FancyButton from "../lab2/FancyButton";

import { 
    FaMoon,
    FaSun,
 } from "react-icons/fa";

function ChangeThemeBtn() {
    const [theme, toggleTheme] = useContext(ThemeContext).theme

    let d_icon = theme == 'light' ? <FaSun /> : <FaMoon />

    return (
        <FancyButton className="fbtn fs-2" onClick={() => toggleTheme('light')}>{d_icon}</FancyButton>
    )
}

export default ChangeThemeBtn