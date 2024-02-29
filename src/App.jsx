import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header_component from './components/Header.jsx'
import Footer_component from './components/Footer.jsx'
import BodyMain from './components/Body_main.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header_component></Header_component>  

        <Outlet></Outlet>    

        <Sidebar></Sidebar>      

        <Footer_component></Footer_component>
    </>
  )
}

export default App
