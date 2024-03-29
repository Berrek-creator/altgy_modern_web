
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import FancyButton from '../routes/lab2/FancyButton';

import { 
    FaUserAlt,
    FaSignOutAlt
} from 'react-icons/fa';

function LogInOutBtn() {

    const dispatch = useDispatch()

    // авторизирован ли пользователь?
    let is_auth = useSelector(state => state.auth.is_auth)

    console.log("Auth?:", is_auth)

    const [el, setEl] = useState()
    
    useEffect(() => {
        if(is_auth) {
            setEl(<Link to='/' onClick={() => dispatch({type: "INVALIDATE_BEARER_TOKEN"})}>
                <FancyButton className="fbtn fs-2"><FaSignOutAlt></FaSignOutAlt></FancyButton>
            </Link>)
        } else {
            setEl(<Link to='/login'>
                <FancyButton className="fbtn fs-2"><FaUserAlt></FaUserAlt></FancyButton>
            </Link>)
        }
    }, [is_auth])


    return (
        el 
    )
}

export default LogInOutBtn