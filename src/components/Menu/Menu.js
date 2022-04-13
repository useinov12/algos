import React from 'react'
import PropTypes from 'prop-types'
import './menu.css'

export default function Menu({theme, handleThemeSwitch}) {

    return (
        <div className="menu menu-grid grid">
        
            <h2>MENU</h2> 
            <div className='theme-toggle-container'>
                <div className='theme-switch'>
                    <span className={theme == 'light' ? 'theme-option theme-active' : 'theme-option'} onClick={()=>handleThemeSwitch('light')}>Light</span>
                    <span className={theme == 'dark' ? 'theme-option theme-active' : 'theme-option'} onClick={()=>handleThemeSwitch('dark')}>Dark</span>
                </div>
            </div>
        </div>
    )
}

Menu.propTypes = {
    length: PropTypes.number,
    max: PropTypes.number,
    handleChangeLength: PropTypes.func, 
    handleChangeMax: PropTypes.func,
    setArray: PropTypes.func,
    array: PropTypes.array
}