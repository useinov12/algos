import React, { useState, useEffect } from 'react'
import Menu from './Menu/Menu'
import SideMenu from './Menu/Side-Menu/SideMenu'
import MainSection from './MainSection/MainSection'
import './layout.css'



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


function Layout({theme, handleThemeSwitch}) {

    //STATES CONNECTED WITH SIDE-MENU
    const [compareMode, setCompareMode] = useState(false)
    const [menuList, setMenuList ] = useState(sortList)
    const [compareList, setCompareList] = useState([])

    //HANDLERS CONNECTED WITH SIDE-MENU
    const handleChangeCompareMode = () => setCompareMode( prev => !prev )
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

    //STATES CONNECTED WITH MAIN MENU 
    const [ syncMode, setSyncMode ] = useState(false)
    const [isRunningSync, setIsRunningSync ] = useState('initial')

    //HANDLERS CONNECTED WITH SIDE-MENU
        const handleSyncModeChange = (state) =>{
            if(state) setSyncMode(state);
            else setSyncMode(prev => !prev);
        }
        const handleisRunningSyncChange = (state)=>{
            setIsRunningSync(state)
        }

    //Turn Off SyncMode if CompareMode is Off
    useEffect(() => {
        if(!compareMode)setSyncMode(false)
    }, [compareMode])

    return (
        <div className="layout">
            <Menu
                syncMode={syncMode}
                theme={theme} 
                isRunningSync={isRunningSync}
                compareMode={compareMode}
                compareList={compareList}
                handleThemeSwitch={handleThemeSwitch} 
                handleisRunningSyncChange={handleisRunningSyncChange}
                handleSyncModeChange={handleSyncModeChange}
                handleChangeCompareMode={handleChangeCompareMode}
            />
            <SideMenu 
                list={menuList} 
                handleChangeList={handleChangeList}
                compareMode={compareMode}
                handleAddToCompareList={handleAddToCompareList}
                compareList={compareList}
            />
            <MainSection 
                isRunningSync={isRunningSync}
                syncMode={syncMode}
                compareMode={compareMode}
                handleSyncModeChange={handleSyncModeChange}
                handleAddToCompareList={handleAddToCompareList}
                handleRemoveFromCompareList={handleRemoveFromCompareList}
                compareList={compareList}
            />
        </div>
    )
}

export default Layout