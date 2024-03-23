
import { pretty_date, c_unescape } from '../../tools';

import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

function DraftCard(props) {

    return (
        <div className="draft-card" id={props.id}>
            <Link to={'./' + props.id} style={{ textDecoration: 'none' }}>
                <div className="draft-card-preview">
                    <h1>{c_unescape(props.title)}</h1>
                    <time dateTime={props.date}>{pretty_date(props.date)}</time>
                </div>
            </Link>
            <hr></hr>
            <div className='btn-container'>
                <Link className='c-btn' to={'./create/' + props.id} state= {{data : props}} >Редактировать</Link>
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