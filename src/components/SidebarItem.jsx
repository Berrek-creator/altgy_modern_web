import {Link } from "react-router-dom";


function SidebarItem(props) {

    function handleClick() {
        props.sendDataToParent(props.id);
    }

    return (
        <article id={props.id} className={"news-card-preview ".concat(props.className)}>
            <h2><Link onClick={handleClick} to={props.lab_link}>{props.lab_title}</Link></h2>
            <p>{props.lab_desc}</p>
        </article>
    )
}

export default SidebarItem