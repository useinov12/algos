import React, { useState } from 'react'
import AlgoList from './AlgoList';
import './side-menu.css'
import { FaSortAmountDownAlt, FaSearch } from 'react-icons/fa';


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
                    }}>  <span>SORT</span><FaSortAmountDownAlt className='side-menu-icon sort-icon'/>
                </button>
                <button 
                    className={clicked ? "list-option active-selection" : "list-option passive-selection"} 
                    onClick={()=>{
                        handleChangeList(searchList)
                        setClicked(true)
                    }}> <span>SEARCH</span><FaSearch className='side-menu-icon search-icon'/>
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
