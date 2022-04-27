import React from 'react'
import PropTypes from 'prop-types'
import './menu.css'
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import {
    Routes,
    Route,
    NavLink
} from "react-router-dom";

export default function Menu({theme, handleThemeSwitch, compareMode, syncMode, handleSyncModeChange, handleChangeCompareMode, isRunningSync, handleisRunningSyncChange, compareList}) {

    //Buttons disable handlers
    const handleDisableCompareBtn = () => {
        if(isRunningSync === 'run' ) return true;
        if(isRunningSync === 'pause' ) return true;
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
        // if(isRunningSync === 'run' ) return true;
        else return false;
    }
    const handleDisablePauseBtn = () =>{
        if(!syncMode || !compareMode) return true;
        // if(isRunningSync !== 'run') return true;
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
                <div className='sync-modes'>
                    <NavLink to={ compareMode ? "/bubblesort" : "/compare-mode"}>
                        <button 
                            className={compareMode ? 'mode-active' : 'mode-passive'}
                            disabled={handleDisableCompareBtn()} 
                            onClick={()=>handleChangeCompareMode()}>
                            <span>Compare Mode</span>
                        </button>
                    </NavLink>
                    <button 
                        className={ syncMode ? 'mode-active' : 'mode-passive'}
                        disabled={handleDisableSyncBtn()} 
                        onClick={()=>handleSyncModeChange()}>
                        <span>SYNC Mode</span>
                    </button>
                    <button 
                        className={compareMode && !syncMode  ? 'mode-active' : 'mode-passive'}
                        disabled={handleDisableIndividBtn()} 
                        onClick={()=>handleSyncModeChange()}>
                        <span>Individual mode</span>
                    </button>
                </div>

                <div className={syncMode ? 'sync-play-menu-on' : 'sync-play-menu-off'}>
                    <button
                        className={isRunningSync === 'reset' && syncMode ? 'sync-play-active' : 'sync-play-passive'}
                        // className={!syncMode && isRunningSync === 'reset' ? 'Off' : 'On'}
                        disabled={handleDisableResetBtn()}
                        onClick={()=>handleisRunningSyncChange('reset')}>
                        <FaStop/>
                    </button> 
                    <button
                        className={isRunningSync === 'run' ? 'sync-play-active' : 'sync-play-passive'}
                        disabled={handleDisableRunSyncBtn()} 
                        onClick={()=>{
                            if(compareList.length===0) return prompt(' Add Algo before compare ');
                            else handleisRunningSyncChange('run');
                        }}>
                        <FaPlay/>
                    </button>

                    <button
                        className={isRunningSync === 'pause' ? 'sync-play-active' : 'sync-play-passive'}
                        disabled={handleDisablePauseBtn()}
                        onClick={()=>handleisRunningSyncChange('pause')}>
                    <FaPause/>
                </button> 
                 </div>
            </div>

            <div className='theme-toggle-container'>
                <div className='theme-switch'>
                    <span className={theme == 'light' ? 'theme-option theme-active' : 'theme-option'} onClick={()=>handleThemeSwitch('light')}>Light</span>
                    <span className={theme == 'dark' ? 'theme-option theme-active' : 'theme-option'} onClick={()=>handleThemeSwitch('dark')}>Dark</span>
                </div>
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

