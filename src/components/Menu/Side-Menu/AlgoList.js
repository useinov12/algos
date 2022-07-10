import React from 'react'
import './side-menu.css'
import { NavLink } from "react-router-dom";

function AlgoList({list, compareMode, handleAddToCompareList, compareList}) {

    const componentIsReady = (algo, idx)=> {
        return <li className="list-item" key={idx} >                  
            <NavLink to={ compareMode ? false : algo.path} className="list-link" >
                <span>{algo.name}</span>
                {
                    compareMode &&  algo.isReady ? 
                    <button onClick={()=>handleAddToCompareList(compareList, algo.name)}>
                        Add
                    </button> : <h6 style={{marginRight:'1rem'}}>Coming soon...</h6>
                }
            </NavLink>
        </li>
    }
    const componentNotReady = (algo,idx) => {
       return  <li className="list-item" key={idx} >                  
            <NavLink to={ compareMode ? false : algo.path} className="list-link" >
                <span>{algo.name}</span>
                { compareMode &&
                    <button onClick={()=>handleAddToCompareList(compareList, algo.name)}>
                        Add
                    </button> }
            </NavLink>
        </li>
    }

    return (
        <ul className="algorithm-list">
            { list.map( (algo, idx) => 
                compareMode ? componentIsReady(algo, idx) : componentNotReady(algo, idx)
            )}
        </ul>
    )
}

export default AlgoList