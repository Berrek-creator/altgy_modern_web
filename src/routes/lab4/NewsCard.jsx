
import { pretty_date } from "../../tools"

import {Link } from "react-router-dom";

function NewsCard(props) {
    
    return (
        <Link to={'news/' + props.id}>
            <div className="news-card" id={props.id}>
                <h1>{props.title}</h1>
                <time dateTime={props.date}>{pretty_date(props.date)}</time>
            </div>
        </Link>
    )
}

export default NewsCard