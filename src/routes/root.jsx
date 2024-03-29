import App from '../App.jsx'

import { Provider } from 'react-redux'
import store from '../Redux/store.js'

import { ThemeContext } from '../ThemeContext.jsx'

import { useState, useEffect } from 'react'

export default function Root() {

    const [theme, setTheme] = useState("light")
    const [showSidebar, setShowSidebar] = useState(false)
  
    function toggleTheme() {
      theme == 'light' ? setTheme("dark") : setTheme('light')  
      console.log(theme)
    }

    function toggleSidebar() {
        setShowSidebar(!showSidebar)
    }
  
    useEffect(() => {
      document.documentElement.className = theme;
    }, [theme, showSidebar])

    return (
        <ThemeContext.Provider value={ {theme : [theme, toggleTheme], sidebar : [showSidebar, toggleSidebar]}}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeContext.Provider>
    )
}