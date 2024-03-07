
import { pretty_date, c_unescape } from "../../tools"

import {Link } from "react-router-dom";

import PropTypes from 'prop-types';

function NewsCard(props) {

    return (
        <Link to={'news/' + props.id} style={{ textDecoration: 'none' }}>
            <div className="news-card" id={props.id}>
                <h1>{c_unescape(props.title)}</h1>
                <time dateTime={props.date}>{pretty_date(props.date)}</time>
            </div>
        </Link>
    )
}

NewsCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    date: PropTypes.string,
}

export default NewsCard