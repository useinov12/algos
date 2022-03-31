import React from 'react'

import './inputs.css'


function Inputs({length, handleChangeLength, array, handleChangeArray, handleChangeSpeed, speed, className, sortIsRunning, inputIsOn}) {

    /* IMPLEMENT POSITIVE NUMBERS ONLY */
    /* CREATE PROMT FOR WRONG INPUT */
    //FUNCTIONS
    const randomizer = (n) => Math.floor(Math.random()*n)
    const createArray = (length) => {
        let arr = []
        for(let i=length; i>0; i--){
            arr.push(randomizer(length))
        }
        handleChangeArray(arr)
    }
    const generateRandomArray = () => {
        let length =  randomizer(300)
        handleChangeLength(length)
        createArray(length)
    }

    return (
        <div className={className}>
            <div className="input-section">
                <label>
                    <div className="number-input-container">
                        <span>Length:</span>  
                        <input 
                            className="number-input" 
                            type="number" 
                            value={length} 
                            onChange={ e => handleChangeLength(e.target.value)} 
                        />
                    </div>
                    <div className="range-input-container">
                        <input 
                            type="range" 
                            className="slider" 
                            step="1" 
                            min={20} max={300} 
                            value={length} 
                            onChange={ e => handleChangeLength(e.target.value)} 
                        />
                    </div>
                </label>
                <label>
                    <span>Sort speed:</span>  
                    <div className="range-input-container">
                        <input 
                            type="range" 
                            className="slider speed-slider" 
                            step="1" 
                            min={10} max={100} 
                            value={speed} 
                            onChange={ e => handleChangeSpeed(e.target.value)} 
                        />
                    </div>
                </label>
            </div>
            <div className="create-btn-container">
                <button
                    // disabled={sortIsRunning? true : false} 
                    // disabled={inputIsOn ? false : true} 
                    className="create-arr-btn" 
                    id="draw" 
                    onClick={()=>createArray(length)}>
                    Create array
                </button>
                <div>or</div>
                <button
                    // disabled={sortIsRunning? true : false} 
                    // disabled={inputIsOn ? false : true} 
                    className="create-arr-btn" 
                    id="draw" 
                    onClick={()=>generateRandomArray()}>
                    RANDOM
                </button>
            </div>
        </div>
    )
}

export default Inputs
