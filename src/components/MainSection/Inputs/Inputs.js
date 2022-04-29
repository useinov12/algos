import React, { useEffect, useState } from 'react'
import './inputs.css'

//FUNCTIONS

function Inputs({syncMode, inputState, isRunningSync, dispatch, className}) {

    const [length, setLength ] = useState(20)
    const handleLengthChange = (l) =>{
        dispatch({type: 'changeLength', playload: l})
        dispatch({type: 'changeArray', playload: l})
        return setLength(l)
    }
    const [speed, setSpeed ] = useState(5)
    const handleSpeedChange = (s) =>{
        dispatch({type: 'changeSpeed', playload: s})
        return setSpeed(s)
    }
    const checkIfNeedDisable = () => {
        if(className === 'local-inputs'){
            if(syncMode) return true;
            else return false;
        } else {
            if(isRunningSync === 'run'||isRunningSync === 'pause' ) return true
            else return false;
        }
    }

    //Generate new array when RESET clicked
        useEffect(() => {
            if(isRunningSync === 'reset') dispatch({type: 'changeArray'})
        }, [isRunningSync])

    return(
        <div className={className}>
            <div className='input-content'>
                <div className="input-container">
                        <p>Length: {length} </p>  
                        <div className="range-input-container">
                            <input 
                                disabled={checkIfNeedDisable()}
                                type="range" 
                                className="slider" 
                                step="1" 
                                min={20} max={100} 
                                value={length} 
                                onChange={ e => handleLengthChange(e.target.value) }
                            />
                        </div>
                    <button
                        className='input-btn'
                        disabled={checkIfNeedDisable()} 
                        onClick={()=>{
                                handleLengthChange(length)
                                dispatch({type: 'changeArray'})}
                        }>GENERATE
                    </button>

                    <button
                        className='input-btn'
                        disabled={checkIfNeedDisable()}
                        onClick={ ()=> dispatch({type: 'changeArrayRandom'})}>
                        RANDOM
                    </button>
                </div>
            </div>
            <div className="input-container">
                <p>Speed: {speed}  ms</p> 
                <div className="range-input-container">
                    <input 
                        disabled={checkIfNeedDisable()} 
                        type="range" 
                        className="slider speed-slider" 
                        step="1" 
                        min={5} max={200} 
                        // value={syncMode ? '' : inputState.speed} 
                        value={speed} 
                        onChange={ e => handleSpeedChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
export default Inputs