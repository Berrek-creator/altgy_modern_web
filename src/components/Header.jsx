import "./header.css"

import Navbar from "./Navbar"

import logo from './../assets/logo.svg'
import header_image from './../assets/branding.jpg'

function header() {
    return(
        <>
    <header>
    <div id="branding">
        <div id="branding-content">
            <div id="logo-wrap">
                <a href='./index.html'>
                    <img className='c-max-fluid' src={logo} width='300' height='300' alt='logo' />
                </a>
            </div>
            <section id="title-wrap">
                <h1> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h1>
            </section>
        </div>
        <img className="c-fluid-img" width="1200" height="552" src={header_image} alt="branding" />
    </div>

    <Navbar/>
    
    </header>
    </>
    )
}

export default header
