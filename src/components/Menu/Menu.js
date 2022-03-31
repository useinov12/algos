import React from 'react'
import PropTypes from 'prop-types'
import './menu.css'

export default function Menu(props) {

    return (
        <div className="menu menu-grid grid">
           <h2>MENU</h2> 
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