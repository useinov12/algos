import React from 'react'
import './side-menu.css'
import {
    NavLink
  } from "react-router-dom";




function AlgoList({list, state, compareMode, handleAddToCompareList, compareList}) {

    return (
        <div className={state ? "algoritms-list " : "algoritms-li" }>
            {
                list.map( (algo, idx) => 
                    <div className="list-item" key={idx} >
                        <NavLink to={compareMode ? false : algo.path} className="list-link">
                            <span>{algo.name}</span>
                            {
                                compareMode && 
                                <button onClick={()=>handleAddToCompareList(compareList, algo.name)}>
                                    Add
                                </button>
                            }
                        </NavLink>
                    </div>
                )
            }
        </div>
    )
}

export default AlgoList