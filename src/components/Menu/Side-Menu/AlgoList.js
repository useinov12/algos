import React from 'react'
import './side-menu.css'
import { NavLink } from "react-router-dom";

function AlgoList({list, clicked, compareMode, handleAddToCompareList, compareList}) {

    return (
        <ul className="algorithm-list">
            { list.map( (algo, idx) => 
                <li className="list-item" key={idx} >
                    <NavLink to={ compareMode ? false : algo.path} className="list-link">
                        <span>{algo.name}</span>
                        {   compareMode && 
                            <button onClick={()=>handleAddToCompareList(compareList, algo.name)}>
                                Add
                            </button>
                        }
                    </NavLink>
                </li>
            )}
        </ul>
    )
}

export default AlgoList