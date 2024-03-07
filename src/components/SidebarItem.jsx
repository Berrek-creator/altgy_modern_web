import {Link } from "react-router-dom";

import PropTypes from 'prop-types';

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

SidebarItem.propTypes = {
    id: PropTypes.number,
    sendDataToParent: PropTypes.func,
    className: PropTypes.string,
    lab_link: PropTypes.string,
    lab_title: PropTypes.string,
    lab_desc: PropTypes.string
}

export default SidebarItem