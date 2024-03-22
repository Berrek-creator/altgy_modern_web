import { Link } from "react-router-dom"
import './lab6.css'

function Lab6(props) {
    return (
        <div id="drafts-menu">
            <h1>Управление черновиками</h1>
            <div>
                <Link to='drafts'>Черновики</Link>
                <Link to='drafts/create'>Создать черновик</Link>
            </div>
        </div>
    )
}

export default Lab6