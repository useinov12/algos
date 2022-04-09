import React from 'react'
import './side-menu.css'
import {
    NavLink
  } from "react-router-dom";




function AlgoList({list, state, compareMode, handleAddToCompareList, compareList}) {
    // <ul className={state ? "algoritms-list search-list" : "algoritms-list sort-list" }>
    // console.log([handleAddToCompareList, compareList])
    return (

        <ul className={state ? "algoritms-list" : "algoritms-list" }>
            {
                list.map( (algo, idx) => 
                    <li className="list-item" key={idx} >
                        <NavLink to={compareMode ? false : algo.path} className="list-link">
                            <span>{algo.name}</span>
                            {
                                compareMode && 
                                <button onClick={()=>handleAddToCompareList(compareList, algo.name)}>
                                    add
                                </button>
                            }
                        </NavLink>
                    </li>
                )
            }
        </ul>
    )
}

export default AlgoList