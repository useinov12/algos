import React, { useState, useEffect } from 'react'
import Menu from './Menu/Menu'
import SideMenu from './Menu/Side-Menu/SideMenu'
import MainSection from './MainSection/MainSection'
import './layout.css'

const sortList = [
    {
        name:"Bubble",
        path:'/bubble-sort',
        isReady:true
    },
    {
        name:"Quick",
        path:"/quick-sort",
        isReady:true
    },
    {
        name:"Merge",
        path:"/merge-sort",
        isReady:false
    },
    {
        name:"Selection",
        path:"/selection-sort",
        isReady:false
    }
]
const searchList = [
    {
        name:"Linear",
        path:"/linear-search",
        isReady:false
    },
    {
        name:"Binary",
        path:"/binary-search",
        isReady:false
    },
    {
        name:"Jump",
        path:"/jump-search",
        isReady:false
    },
    {
        name:"Interpolation",
        path:"/Interpolation-search",
        isReady:false
    }
]

const list = [...sortList, ...searchList]








function Layout({theme, handleThemeSwitch}) {


    //STATES CONNECTED WITH SIDE-MENU
    const [compareMode, setCompareMode] = useState(false)
    const [menuList, setMenuList ] = useState(sortList)
    const [compareList, setCompareList] = useState([])

    //HANDLERS CONNECTED WITH SIDE-MENU
    const handleChangeCompareMode = () => setCompareMode( prev => !prev )

    
    const handleAddToCompareList = (compareList, item) =>{
        // if(compareList.find((d)=>d === item))return  //check if exsist
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
        const handleIsRunningSyncChange = (state)=>{
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
                handleThemeSwitch={handleThemeSwitch} 
                handleIsRunningSyncChange={handleIsRunningSyncChange}
                handleSyncModeChange={handleSyncModeChange}
                handleChangeCompareMode={handleChangeCompareMode}
            />
            <SideMenu 
                searchList={searchList}
                sortList={sortList}
                list={menuList} 
                handleChangeList={handleChangeList}
                compareMode={compareMode}
                handleAddToCompareList={handleAddToCompareList}
                compareList={compareList}
            />
            <MainSection 
            
                searchList={searchList}
                sortList={sortList}
                isRunningSync={isRunningSync}
                syncMode={syncMode}
                handleIsRunningSyncChange={handleIsRunningSyncChange}
                handleRemoveFromCompareList={handleRemoveFromCompareList}
                compareList={compareList}
                compareMode={compareMode}
                handleChangeCompareMode={handleChangeCompareMode}
            />
        </div>
    )
}

export default Layout