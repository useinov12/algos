import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './menu.css'

export default function Menu({theme, handleThemeSwitch, compareMode, syncMode, handleSyncModeChange, handleChangeCompareMode, isRunningSync, handleIsRunningSyncChange}) {

    let navigate = useNavigate()

    //BUTTON DISABLE HANDLERS
    const handleDisableCompareBtn = () => {
        if(isRunningSync === 'run'|| isRunningSync === 'pause' ) return true;
        else return false;
    }
    const handleDisableSyncBtn = () =>{
        if(syncMode) return true;
        if(!compareMode) return true;
        if(isRunningSync === 'run' ) return true;
        if(isRunningSync === 'pause' ) return true;
        else return false;
    }
    const handleDisableASYNCBtn = () =>{
        if(!syncMode) return true;
        if(!compareMode) return true;
        if(isRunningSync === 'run' || isRunningSync === 'pause' ) return true;
        else return false;
    }

    useEffect(() => {
        if(!compareMode)navigate('/bubble-sort')
        else navigate('/compare-mode')
    }, [compareMode])

    return (
        <div className="menu menu-grid grid">

            <div className='sync-menu'>
                <div className='mode-menu' >
                    <button 
                        className={compareMode ? 'mode-passive' : 'mode-active' }
                        disabled={handleDisableCompareBtn()} 
                        onClick={()=>handleChangeCompareMode()}>
                        <span>Single Mode</span>
                    </button>
                    <button 
                        className={compareMode ? 'mode-active' : 'mode-passive'}
                        disabled={handleDisableCompareBtn()} 
                        onClick={()=>handleChangeCompareMode()}>
                        <span>Compare Mode</span>
                    </button>
                </div>

                <div className='sync-modes'>
                    <button 
                        className={compareMode && !syncMode  ? 'mode-active' : 'mode-passive'}
                        disabled={handleDisableASYNCBtn()} 
                        onClick={()=>handleSyncModeChange()}>
                        <span>ASYNC mode</span>
                    </button>
                    <button 
                        className={ syncMode ? 'mode-active' : 'mode-passive'}
                        disabled={handleDisableSyncBtn()} 
                        onClick={()=>handleSyncModeChange()}>
                        <span>SYNC Mode</span>
                    </button>
                </div>

            </div>

            <div className='theme-switch'>
                <button 
                    className={ theme == 'light' ? 'theme-option theme-option__active' : 'theme-option theme-option__passive' } 
                    onClick={()=>handleThemeSwitch('light')}>
                    <FaSun/>
                </button>
                <button 
                    className={ theme == 'dark' ? 'theme-option theme-option__active' : 'theme-option theme-option__passive'  } 
                    onClick={()=>handleThemeSwitch('dark')}>
                    <FaMoon/>
                </button>
            </div>

        </div>
    )
}

Menu.propTypes = {
    length: PropTypes.number,
    max: PropTypes.number,
    handleChangeLength: PropTypes.func, 
    handleChangeMax: PropTypes.func,
    setArray: PropTypes.func,
    array: PropTypes.array
}

