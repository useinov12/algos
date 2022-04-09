import React, { useEffect, useState } from 'react'

import './inputs.css'


function Inputs({syncMode, inputState, runState, dispatch, className}) {

    const checkIfNeedDisable = () => {
        //if local inputs
        if(className === 'local-inputs'){
            if(syncMode) return true;
            else return false
        }
        //if sync input
        else {
            if(runState === 'run') return true
            if(runState === 'pause') return true
            else return false
        }
    }

    useEffect(() => {
        if(runState !== 'reset') return; //reset array onClick RESET
        dispatch({type: 'changeArray'})
    }, [runState])


    return (
        <div className={className} >
            <div className="input-section">
                <label>
                    <div className="number-input-container">
                        <span>Length:</span>  
                        <input 
                            disabled={checkIfNeedDisable()} 
                            className="number-input" 
                            type="number" 
                            value={syncMode ? '' : inputState.length} 
                            onChange={ e => 
                                syncMode && className=='local-inputs' ?  ()=>{} :
                                dispatch({type: 'changeLength', playload: e.target.value})
                            } 
                        />
                    </div>
                    <div className="range-input-container">
                        <input 
                            disabled={checkIfNeedDisable()}  //implement additional checkihng
                            type="range" 
                            className="slider" 
                            step="1" 
                            min={20} max={300} 
                            value={syncMode ? '' : inputState.length} 
                            onChange={ e => //what is happening here in Local?
                                dispatch({type: 'changeLength', playload: e.target.value})
                            }
                        />
                    </div>
                </label>
                <label>
                    <span>Sort speed:</span>  
                    <div className="range-input-container">
                        <input 
                            disabled={checkIfNeedDisable()} 
                            type="range" 
                            className="slider speed-slider" 
                            step="1" 
                            min={10} max={100} 
                            value={syncMode ? '' : inputState.speed} 
                            onChange={ e => dispatch({type: 'changeSpeed', playload: e.target.value})}
                        />
                    </div>
                </label>
            </div>
            <div className="create-btn-container">
                <button
                    disabled={checkIfNeedDisable()} 
                    className="create-arr-btn" 
                    id="draw" 
                    onClick={()=>dispatch({type: 'changeArray'})}>
                    Create array
                </button>
                <div>or</div>
                <button
                    disabled={checkIfNeedDisable()}
                    className="create-arr-btn" 
                    id="draw" 
                    onClick={()=>dispatch({type: 'changeArrayRandom'})}>
                    RANDOM
                </button>
            </div>
        </div>
    )
}

export default Inputs


/* IMPLEMENT POSITIVE NUMBERS ONLY */
/* CREATE PROMT FOR WRONG INPUT */
//FUNCTIONS
const randomizer = (n) => Math.floor(Math.random()*n)
const createArray = (length) => {
    let arr = []
    for(let i=length; i>0; i--){
        arr.push(randomizer(length))
    }
}
const generateRandomArray = () => {
    let length =  randomizer(300)
    createArray(length)
}

