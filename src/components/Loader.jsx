import './Loader.css'

import { CircularProgress } from '@mui/material'

import turtle_loader from './../assets/loader-turtle.png'

function Loader() {
    return (
        <div className="loader-container">
            
            <img class = "loader" src={turtle_loader}></img>
            
        </div>
    )
}

export default Loader

// <CircularProgress className='loader'/>