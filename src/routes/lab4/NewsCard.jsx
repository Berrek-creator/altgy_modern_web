
import { pretty_date } from "../../tools"

import {Link } from "react-router-dom";

import PropTypes from 'prop-types';

function NewsCard(props) {

    return (
        <Link to={'news/' + props.id} style={{ textDecoration: 'none' }}>
            <div className="news-card" id={props.id}>
                <h1>{props.title}</h1>
                <time dateTime={props.date}>{pretty_date(props.date)}</time>
            </div>
        </Link>
    )
}

NewsCard.PropTypes = {
    id: PropTypes.number, // the prop can be of any data type
    title: PropTypes.string, // prop should be a string
    date: PropTypes.string, // prop should be a number
}

export default NewsCard