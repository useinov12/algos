import React from 'react'
import { BrowserRouter } from "react-router-dom"
import Layout from './components/Layout'
import './App.css'
import './reset.css'

function App() {

  console.log('App rerendered')

  return (
    <div className="App" >
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </div>
  );
}

export default App;
