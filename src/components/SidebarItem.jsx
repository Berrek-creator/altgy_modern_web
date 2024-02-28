import {Link } from "react-router-dom";
function SidebarItem(props) {
    return (
        <article className="news-card-preview">
            <h2><Link to={props.lab_link}>{props.lab_title}</Link></h2>
            <p>{props.lab_desc}</p>
        </article>
    )
}

export default SidebarItem