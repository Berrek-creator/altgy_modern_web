import { Link } from "react-router-dom";
function Navbar() {
    return(
    <nav>
        <Link className="nav-item" to={"/"}>Главная</Link>
    </nav>
    )
}

export default Navbar