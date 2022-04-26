import React, { useEffect, useState } from 'react'
import './inputs.css'


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
        //If local inputs
        if(className === 'local-inputs'){
            if(syncMode) return true;
            else return false
        }
        //If sync input
        else {
            if(isRunningSync === 'run') return true
            if(isRunningSync === 'pause') return true
            else return false
        }
    }

    //generate new array onClick RESET
        useEffect(() => {
            if(isRunningSync === 'reset') dispatch({type: 'changeArray'})
        }, [isRunningSync])


    return(
        <div className={className}>
            <div className='input-content'>
                <div className="length-input-container">
                        <h3>Length: {length} </h3>  
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
                        disabled={checkIfNeedDisable()} 
                        // className="create-btn" 
                        id="draw" 
                        onClick={()=>{
                                handleLengthChange(length)
                                dispatch({type: 'changeArray'})}
                        }>CREATE
                    </button>

                    <div>or</div>

                    <button
                        disabled={checkIfNeedDisable()}
                        // className="create-btn" 
                        id="draw" 
                        onClick={ ()=> dispatch({type: 'changeArrayRandom'})
                        }>RANDOM
                    </button>
                </div>

            </div>
            <div className="speed-input-container">
                <h3>Speed: {speed}  ms</h3> 
                <div className="range-input-container">
                    <input 
                        disabled={checkIfNeedDisable()} 
                        type="range" 
                        className="slider speed-slider" 
                        step="1" 
                        min={5} max={100} 
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


// return(
//     <div className={className}>
//         <div className='input-content'>
//             <div className="length-input-container">
//                 <label>
//                     <div className="number-input-container">
//                         <h3>Length:</h3>  
//                         <input 
//                             disabled={checkIfNeedDisable()} 
//                             className="number-input" 
//                             type="number" 
//                             // value={ syncMode ? '' : inputState.length} 
//                             value={inputState.array.length} 
//                             onChange={ e => 
//                                 syncMode && className=='local-inputs' ?  ()=>{} :
//                                 dispatch({type: 'changeLength', playload: e.target.value})
//                             } 
//                         />
//                     </div>
//                     <div className="range-input-container">
//                         <input 
//                             disabled={checkIfNeedDisable()}  //implement additional checkihng
//                             type="range" 
//                             className="slider" 
//                             step="1" 
//                             min={20} max={300} 
//                             value={inputState.array.length} 
//                             onChange={ e => //what is happening here in Local?
//                                 dispatch({type: 'changeLength', playload: e.target.value})
//                             }
//                         />
//                     </div>
//                 </label>
//                 <button
//                     disabled={checkIfNeedDisable()} 
//                     // className="create-btn" 
//                     id="draw" 
//                     onClick={()=>dispatch({type: 'changeArray'})}
//                     >Create array
//                 </button>
//             </div>
//             <div>or</div>
//             <button
//                 disabled={checkIfNeedDisable()}
//                 // className="create-btn" 
//                 id="draw" 
//                 onClick={()=>dispatch({type: 'changeArrayRandom'})}>
//                 RANDOM
//             </button>
//             <div className="speed-input-container">
//                 <label>
//                     <span>Sort speed:</span>  
//                     <div className="range-input-container">
//                         <input 
//                             disabled={checkIfNeedDisable()} 
//                             type="range" 
//                             className="slider speed-slider" 
//                             step="1" 
//                             min={10} max={100} 
//                             value={syncMode ? '' : inputState.speed} 
//                             onChange={ e => dispatch({type: 'changeSpeed', playload: e.target.value})}
//                         />
//                     </div>
//                 </label>
//             </div>
//         </div>
//     </div>
// )


/* return (
    <div className={className} >
        <div className="input-content">
            <div className="inputs-wrap">
                <label>
                    <div className="number-input-container">
                        <h3>Length:</h3>  
                        <input 
                            disabled={checkIfNeedDisable()} 
                            className="number-input" 
                            type="number" 
                            // value={ syncMode ? '' : inputState.length} 
                            value={inputState.array.length} 
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
                            value={inputState.array.length} 
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
            <button
                disabled={checkIfNeedDisable()} 
                // className="create-btn" 
                id="draw" 
                onClick={()=>dispatch({type: 'changeArray'})}>
                Create array
            </button>
        </div>
        <div className="create-btn-container">
            <div>or</div>
            <button
                disabled={checkIfNeedDisable()}
                // className="create-btn" 
                id="draw" 
                onClick={()=>dispatch({type: 'changeArrayRandom'})}>
                RANDOM
            </button>
        </div>
    </div>
) */