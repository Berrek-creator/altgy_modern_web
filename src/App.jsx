import { useEffect, useState } from 'react'
import './App.css'

import Header_component from './components/Header.jsx'
import Footer_component from './components/Footer.jsx'
// import BodyMain from './components/Body_main.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'



function App() {
  
  return (
      <>
        <Header_component></Header_component>  

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
