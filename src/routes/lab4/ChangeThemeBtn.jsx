import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

import FancyButton from "../lab2/fancy_button";

function ChangeThemeBtn(props) {
    const {theme, toggleTheme} = useContext(ThemeContext)

    let d_icon = String.fromCodePoint( theme == 'light' ? '127761' : '127774' )

    return (
        <FancyButton className="fbtn mb-auto fs-2" onClick={() => toggleTheme()}>{d_icon}</FancyButton>
    )
}

export default ChangeThemeBtn