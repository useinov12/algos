import React from 'react'
import './PlayMenu.css'
import { FaPlay, FaPause, FaStop } from "react-icons/fa";

function PlayMenu({type, syncMode, compareMode, compareList, isRunningSync, isRunningLocal, handleIsRunningLocalChange, handleIsRunningSyncChange}) {


    const handleDisableResetBtn = () =>{
        if(!syncMode || !compareMode) return true;
        if(isRunningSync !== 'pause') return true;
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


    const renderSyncPlayMenu = () => {

        return <div className={syncMode ? 'sync-play-menu sync-play-menu__active' : 'sync-play-menu sync-play-menu__passive'}>
        <button
            className={isRunningSync === 'reset' && syncMode ? 'sync-play-btn sync-play-btn__active' : 'sync-play-btn sync-play-btn__passive'}
            disabled={handleDisableResetBtn()}
            onClick={()=>handleIsRunningSyncChange('reset')}> 
            <FaStop/>
        </button> 
        <button
            className={isRunningSync === 'run' ? 'sync-play-btn sync-play-btn__active' : 'sync-play-btn sync-play-btn__passive'}
            disabled={handleDisableRunSyncBtn()} 
            onClick={()=>{
                if(compareList.length===0) return prompt(' Add Algo before compare ');
                else handleIsRunningSyncChange('run')}}> 
            <FaPlay/>
        </button>

        <button
            className={isRunningSync === 'pause' ? 'sync-play-btn sync-play-btn__active' : 'sync-play-btn sync-play-btn__passive'}
            disabled={handleDisablePauseBtn()}
            onClick={()=>handleIsRunningSyncChange('pause')}> 
            <FaPause/>
        </button> 
    </div>
    }

    const renderLocalPlayMenu = () => {
        return <div className='local-menu-buttons'>
        <div className={ syncMode ? 'local-play-menu-off' : 'local-play-menu-on'}>
            <button className={isRunningLocal === 'reset' ? 'local-play-btn local-play-btn__active' :  'local-play-btn local-play__passive' }
                disabled={isRunningLocal === 'run' || syncMode ? true : false} 
                onClick={()=>handleIsRunningLocalChange('reset')}> 
                    <FaStop/>
            </button>
            <button className={isRunningLocal  === 'run' ? 'local-play-btn local-play-btn__active' :  'local-play-btn local-play__passive' }
                disabled={syncMode ? true : false} 
                onClick={()=>handleIsRunningLocalChange('run')}> 
                    <FaPlay/>
            </button>
            <button className={isRunningLocal === 'pause' ? 'local-play-btn local-play-btn__active' :  'local-play-btn local-play__passive' }
                disabled={syncMode ? true : false} 
                onClick={()=>handleIsRunningLocalChange('pause')}> 
                <FaPause/>
            </button>
        </div>

        {/* <button 
            className='local-next-step'
            disabled={isRunningLocal === 'run' ? true : false}
            onClick={()=>dispatchAlgo({type: {algo:typeOfAlgo, command:'run'} })}>
            next step
        </button> */}
    </div>
    }

    return (
        <> 
        { type === 'sync' ? renderSyncPlayMenu() : renderLocalPlayMenu() } 
        </>
    )
}

export default PlayMenu
