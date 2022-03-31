import React, { useEffect, useState } from 'react'

import './inputs.css'


function Inputs({syncMode, inputState, dispatch, className}) {

    const [disableLocal, setDisableLocal ] = useState(false)

    /* IMPLEMENT POSITIVE NUMBERS ONLY */
    /* CREATE PROMT FOR WRONG INPUT */
    //FUNCTIONS
    const randomizer = (n) => Math.floor(Math.random()*n)
    const createArray = (length) => {
        let arr = []
        for(let i=length; i>0; i--){
            arr.push(randomizer(length))
        }
        // handleChangeArray(arr)
    }
    const generateRandomArray = () => {
        let length =  randomizer(300)
        // handleChangeLength(length)
        createArray(length)
    }


    // Effects
    useEffect(() => {
        if(syncMode && className=='local-inputs')  setDisableLocal(true)
        if(!syncMode || className !=='local-inputs')  setDisableLocal(false)
        return
    }, [syncMode])


    return (
        <div className={className}>
            <div className="input-section">
                <label>
                    <div className="number-input-container">
                        <span>Length:</span>  
                        <input 
                            disabled={disableLocal}
                            className="number-input" 
                            type="number" 
                            value={inputState.length} 
                            onChange={ e => 
                                syncMode && className=='local-inputs' ?  ()=>{} :
                                dispatch({type: 'changeLength', playload: e.target.value})
                            } 
                        />
                    </div>
                    <div className="range-input-container">
                        <input 
                            type="range" 
                            className="slider" 
                            step="1" 
                            min={20} max={300} 
                            value={inputState.length} 
                            onChange={ e => 
                                syncMode && className=='local-inputs' ?  ()=>{} :
                                dispatch({type: 'changeLength', playload: e.target.value})
                            }
                        />
                    </div>
                </label>
                <label>
                    <span>Sort speed:</span>  
                    <div className="range-input-container">
                        <input 
                            disabled={disableLocal}
                            type="range" 
                            className="slider speed-slider" 
                            step="1" 
                            min={10} max={100} 
                            value={inputState.speed} 
                            onChange={ e => dispatch({type: 'changeSpeed', playload: e.target.value})}
                        />
                    </div>
                </label>
            </div>
            <div className="create-btn-container">
                <button
                    disabled={disableLocal}
                    className="create-arr-btn" 
                    id="draw" 
                    onClick={()=>dispatch({type: 'changeArray'})}>
                    Create array
                </button>
                <div>or</div>
                <button
                    disabled={disableLocal}
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
