import { is_bearer_valid } from './auth_tools';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

function LogInOutBtn() {

    const dispatch = useDispatch()

    let bearerToken = useSelector(state => state.auth.bearerToken)

    const [el, setEl] = useState()
    
    useEffect(() => {
        is_bearer_valid(bearerToken).then(is_valid => {
            if(is_valid) {
                setEl(<Link to='/' onClick={() => dispatch({type: "INVALIDATE_BEARER_TOKEN"})}>Выйти</Link>)
            } else {
                setEl(<Link to='/login'>Войти</Link>)
            }
        })
    }, [bearerToken])


    return (
        el
    )
}

export default LogInOutBtn