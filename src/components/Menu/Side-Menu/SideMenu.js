import React, { useState } from 'react'

import AlgoList from './AlgoList';
import './side-menu.css'

const sortList = [
    {
        name:"Bubble",
        path:'/bubble-sort',
    },
    {
        name:"Quick",
        path:"/quick-sort" 
    },
    {
        name:"Merge",
        path:"/merge-sort"
    },
    {
        name:"Selection",
        path:"/selection-sort"
    }
]
const searchList = [
    {
        name:"Linear",
        path:"/linear-search"
    },
    {
        name:"Binary",
        path:"/binary-search"
    },
    {
        name:"Jump",
        path:"/jump-search"
    },
    {
        name:"Interpolation",
        path:"/Interpolation-search"
    }
]


function SideMenu({list, handleChangeList, compareMode, handleAddToCompareList, compareList}) {
    const [ state, setState ] = useState(false)


    //SWITCH BETWEEN SEARCH AND SORT Lists
    return (
        <div className="side-menu side-menu-grid grid">
            <h2 className="side-menu-header">
                Algoritms
            </h2>
        
            <div className="list-content">
                <div className="list-switch">  
                    <span className={!state ? "list-option sort-list" : "list-option sort-option" } 
                        onClick={()=>{
                            handleChangeList(sortList)
                            setState(false)
                        }}>
                        <p>SORT</p>
                    </span>
                    <span className={state ? "list-option search-list" : "list-option search-option" } 
                        onClick={()=>{
                            handleChangeList(searchList)
                            setState(true)
                        }}>
                        <p>SEARCH</p>
                    </span>
                </div>
            </div>
            
            <AlgoList 
                list={list} 
                state={state} 
                compareMode={compareMode}
                handleAddToCompareList={handleAddToCompareList}
                compareList={compareList}
            />
        </div>
    )
}

export default SideMenu
