
import { pretty_date, c_unescape } from '../../tools';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

function DraftCard(props) {

    return (
        <div className="news-card" id={props.id}>
            <Link to={'./' + props.id} style={{ textDecoration: 'none' }}>
                <h1>{c_unescape(props.title)}</h1>
            </Link>
            
            <time dateTime={props.date}>{pretty_date(props.date)}</time>
            
            <div>
                <Link className='edit-link' to={'./create/' + props.id} state= {{data : props}} >Edit</Link>
            </div>
        </div>
    )
}

DraftCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    date: PropTypes.string,
}

export default DraftCard