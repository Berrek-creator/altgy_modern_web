import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

import FancyButton from "../lab2/FancyButton";

function ChangeThemeBtn() {
    const [theme, toggleTheme] = useContext(ThemeContext).theme

    let d_icon = String.fromCodePoint( theme == 'light' ? '127761' : '127774' )

    return (
        <FancyButton className="fbtn mb-auto fs-2" onClick={() => toggleTheme('light')}>{d_icon}</FancyButton>
    )
}

export default ChangeThemeBtn