import React, { useState } from 'react'
import AlgoList from './AlgoList';
import './side-menu.css'


function SideMenu({searchList, sortList, list, handleChangeList, compareMode, handleAddToCompareList, compareList}) {
    const [ clicked, setClicked ] = useState(false)

    //SWITCH BETWEEN SEARCH AND SORT LISTS
    return (
        <div className="side-menu side-menu-grid grid">

            <h2 className="side-menu-header">
                Algoritms
            </h2>

            <div className="list-switch">  
                <button 
                    className={!clicked ? "list-option active-selection" : "list-option passive-selection"} 
                    onClick={()=>{
                        handleChangeList(sortList)
                        setClicked(false)
                    }}> <p>SORT</p>
                </button>
                <button 
                    className={clicked ? "list-option active-selection" : "list-option passive-selection"} 
                    onClick={()=>{
                        handleChangeList(searchList)
                        setClicked(true)
                    }}> <p>SEARCH</p>
                </button>
            </div>
            
            <AlgoList 
                list={list} 
                compareMode={compareMode}
                handleAddToCompareList={handleAddToCompareList}
                compareList={compareList}
            />
        </div>
    )
}

export default SideMenu
