import { Children, useEffect, useState } from 'react'
import './App.css'

import Header_component from './components/Header.jsx'
import Footer_component from './components/Footer.jsx'
import BodyMain from './components/Body_main.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

import { ThemeContext } from './ThemeContext.jsx'

function App() {
  const [count, setCount] = useState(0)

  
  const [theme, setTheme] = useState("light")
  
  function toggleTheme() {
    theme == 'light' ? setTheme("dark") : setTheme('light')  
    console.log(theme)
  }

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme])
  
  return (
      <ThemeContext.Provider value={{theme, toggleTheme}}>
            <Header_component></Header_component>  

            <main id="front-page" className="c-container">
              <Outlet></Outlet>    
            </main>

            <Sidebar></Sidebar>      

            <Footer_component></Footer_component>
      </ThemeContext.Provider>
  )
}

export default App
