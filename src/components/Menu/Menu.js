import React from 'react'
import PropTypes from 'prop-types'
import './menu.css'
import { FaPlay, FaPause, FaStop, FaSun, FaMoon } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Menu({theme, handleThemeSwitch, compareMode, syncMode, handleSyncModeChange, handleChangeCompareMode, isRunningSync, handleisRunningSyncChange, compareList}) {

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
    const handleDisableIndividBtn = () =>{
        if(!syncMode) return true;
        if(!compareMode) return true;
        if(isRunningSync === 'run' || isRunningSync === 'pause' ) return true;
        else return false;
    }
    const handleDisableRunSyncBtn = () =>{
        if(!syncMode || !compareMode) return true;
        else return false;
    }
    const handleDisablePauseBtn = () =>{
        if(!syncMode || !compareMode) return true;
        else return false;
    }
    const handleDisableResetBtn = () =>{
        if(!syncMode || !compareMode) return true;
        if(isRunningSync !== 'pause') return true;
        else return false;
    }

    return (
        <div className="menu menu-grid grid">

            <div className='sync-menu'>

                <NavLink to={ handleDisableCompareBtn() ? " " : compareMode ? "/bubble-sort" : "/compare-mode"}>
                    <button 
                        className={compareMode ? 'mode-active' : 'mode-passive'}
                        disabled={handleDisableCompareBtn()} 
                        onClick={()=>handleChangeCompareMode()}>
                        <span>Compare Mode</span>
                    </button>
                </NavLink>

                <div className='sync-modes'>
                    <button 
                        className={compareMode && !syncMode  ? 'mode-active' : 'mode-passive'}
                        disabled={handleDisableIndividBtn()} 
                        onClick={()=>handleSyncModeChange()}>
                        <span>Individual mode</span>
                    </button>
                    <button 
                        className={ syncMode ? 'mode-active' : 'mode-passive'}
                        disabled={handleDisableSyncBtn()} 
                        onClick={()=>handleSyncModeChange()}>
                        <span>SYNC Mode</span>
                    </button>
                </div>


                <div className={syncMode ? 'sync-play-menu sync-play-menu__active' : 'sync-play-menu sync-play-menu__passive'}>
                    <button
                        className={isRunningSync === 'reset' && syncMode ? 'sync-play-btn sync-play-btn__active' : 'sync-play-btn sync-play-btn__passive'}
                        disabled={handleDisableResetBtn()}
                        onClick={()=>handleisRunningSyncChange('reset')}> 
                        <FaStop/>
                    </button> 
                    <button
                        className={isRunningSync === 'run' ? 'sync-play-btn sync-play-btn__active' : 'sync-play-btn sync-play-btn__passive'}
                        disabled={handleDisableRunSyncBtn()} 
                        onClick={()=>{
                            if(compareList.length===0) return prompt(' Add Algo before compare ');
                            else handleisRunningSyncChange('run')}}> 
                        <FaPlay/>
                    </button>

                    <button
                        className={isRunningSync === 'pause' ? 'sync-play-btn sync-play-btn__active' : 'sync-play-btn sync-play-btn__passive'}
                        disabled={handleDisablePauseBtn()}
                        onClick={()=>handleisRunningSyncChange('pause')}> 
                        <FaPause/>
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

