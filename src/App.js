import React, { useState } from 'react'
import { BrowserRouter } from "react-router-dom"
import Layout from './components/Layout'
import './App.css'
import './reset.css'

function App() {

  console.log('App rerendered')
  const [theme, setTheme ] = useState('dark')
  const handleThemeSwitch = ( theme )=>{
    setTheme(theme)
  }
  return (
    <div className={`App theme-${theme}`} >
      <BrowserRouter>
        <Layout theme={theme} handleThemeSwitch={handleThemeSwitch}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
