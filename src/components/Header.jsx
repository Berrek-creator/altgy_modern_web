import "./Header.css"

import Navbar from "./Navbar"

import logo from './../assets/logo.svg'
import header_image from './../assets/branding.jpg'

import { Link } from "react-router-dom"

import ChangeThemeBtn from "../routes/lab4/ChangeThemeBtn"

import LogInOutBtn from "./LogInOutBtn"


function Header() {
    return(
    <>
        <header>
        <div id="branding">
            <div id="branding-content">
                <div id="logo-wrap">
                    <Link to='/'>
                        <img className='c-max-fluid' src={logo} width='300' height='300' alt='logo' />
                    </Link>
                </div>
                <section id="title-wrap">
                    <h1> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h1>
                </section>
                <div className="c-btn-group">
                    <ChangeThemeBtn></ChangeThemeBtn>
                    <LogInOutBtn></LogInOutBtn>
                </div>
            </div>
            <img className="c-fluid-img" width="1200" height="552" src={header_image} alt="branding" />
        </div>

        <Navbar/>
        </header>
    </>
    )
}

export default Header
