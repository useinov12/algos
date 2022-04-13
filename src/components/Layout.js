import React, { useState, useEffect } from 'react'
import Menu from './Menu/Menu'
import SideMenu from './Menu/Side-Menu/SideMenu'
import MainSection from './MainSection/MainSection'
import './layout.css'

const sortList = [
    {
        name:"Bubble",
        path:'/bubblesort',

    },
    {
        name:"Quick",
        path:"/quicksort"
    },
    {
        name:"Merge",
        path:"/mergesort"
    },
    {
        name:"Selection",
        path:"/selectionsort"
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


function Layout({theme, handleThemeSwitch}) {

    //STATES CONNECTED WITH SIDE-MENU
    const [compareMode, setCompareMode] = useState(false)
    const [menuList, setMenuList ] = useState(sortList)
    const [compareList, setCompareList] = useState([])

    //HANDLERS CONNECTED WITH SIDE-MENU
    const handleChangeMode = () => setCompareMode((prev)=>!prev)
    const handleAddToCompareList = (compareList, item) =>{
        if(compareList.find((d)=>d === item))return  //check if exsist
        let updated = [...compareList]
        updated.push(item)
        setCompareList(updated)
    }
    const handleRemoveFromCompareList = (compareList, item) =>{
        let updated = compareList.filter((d)=>d !== item)
        setCompareList(updated)
    }
    const handleChangeList= menuList => {
      let holder = [...menuList]
      setMenuList(holder)
    }

    return (
        <div className="layout">
            <Menu theme={theme} handleThemeSwitch={handleThemeSwitch} />
            <SideMenu 
                list={menuList} 
                handleChangeList={handleChangeList}
                compareMode={compareMode}
                handleAddToCompareList={handleAddToCompareList}
                compareList={compareList}
            />
            <MainSection 
                handleChangeMode={handleChangeMode}
                compareMode={compareMode}
                handleAddToCompareList={handleAddToCompareList}
                handleRemoveFromCompareList={handleRemoveFromCompareList}
                compareList={compareList}
            />
        </div>
    )
}

export default Layout