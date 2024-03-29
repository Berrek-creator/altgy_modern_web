import { useEffect, useState } from 'react'
import './App.css'

import Header_component from './components/Header.jsx'
import MUI_Navbar from './components/MUI_Navbar.jsx'

import Footer_component from './components/Footer.jsx'
// import BodyMain from './components/Body_main.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { is_bearer_valid } from './components/auth_tools.jsx'

function App() {

  const bearerToken = useSelector(store => store.auth.bearerToken)
  const dispatch = useDispatch()

  useEffect(() => {
    is_bearer_valid(bearerToken).then(is_valid => {
      if(is_valid) {
        console.log("APP, token valid?", is_valid)
      } else {
        dispatch({type: "INVALIDATE_BEARER_TOKEN"})
      }
    }, [bearerToken])
  })

  return (
      <>
        <Header_component></Header_component>  
        <MUI_Navbar></MUI_Navbar>

        <div id='main-wrap'>
          <main id="front-page" className="c-container">
            <Outlet></Outlet>    
          </main>

          <Sidebar></Sidebar>      
        </div>
        

        <Footer_component></Footer_component>
      </>
  )
}

export default App
