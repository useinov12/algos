import React, { useState, useEffect, useReducer } from 'react'
import Inputs from '../Inputs/Inputs'
import Chart from '../../Chart/Chart'
import './compare-block.css'


const randomizer = (n) => Math.floor(Math.random()*n)
const createArray = (length) => {
    let arr = []
    for(let i=length; i>0; i--){
        arr.push(randomizer(length))
    }
    return arr
    // handleChangeArray(arr)
}
const generateRandomArray = () => {
    let length =  randomizer(300)
    // handleChangeLength(length)
    createArray(length)
}


function CompareBlock(props) {
    // Global sync states
    const {
        syncMode,
        typeOfAlgo,
        inputStateSync,
        compareList,
        handleRemoveFromCompareList
    } = props 

    // Local inputs
    let InitSyncInputState = {
        speed:50,
        length:50,
        array:(length)=>createArray(length)
    }
    function reducer(input, action){
        switch (action.type){
            case 'changeSpeed':
                return {...input, speed:action.playload}
            case 'changeLength':
                return {...input, length:action.playload}
        }
        return input
    }
    const [ inputState, dispatch ] = useReducer(reducer, InitSyncInputState)
    
    // States for chart animation and stats
    const [swaps, setSwaps ] = useState(0)
    const [comparingIdx, setComparingIdx] = useState(0)
    const [sorted, setSorted ] = useState(0)


    // Effects
    let inputStateHolder = inputState
    useEffect(() => {
        console.log(syncMode)
        if(syncMode)return inputStateHolder = inputStateSync;
        return inputStateHolder = inputState;
    }, [syncMode])
    return (
        <div className="compare-mode-block">
            <button
                // disabled={sortIsRunningLocal ? true : false}  
                onClick={()=>
                    handleRemoveFromCompareList(compareList, typeOfAlgo)
                }>
                X
            </button>
            <Inputs
                syncMode={syncMode}
                inputState={inputStateHolder}
                dispatch={dispatch}
                className={'local-inputs'}
             />

            <div className="compare-mode-algo">
                <div className="compare-mode-algo-info">
                    <div>Swaps: {swaps}</div>
                    <div>Some stats: ...</div>
                    <div>Complexity: O(n)</div>
                    <div className="compare-mode-algo-btn-container">
                        <button id="sort"
                            disabled={syncMode ? true : false} 
                            onClick={
                                ()=>true
                            }>
                            SORT!
                        </button>

                        <button id="stop" 
                            disabled={syncMode ? true : false} 
                            onClick={
                                ()=>true
                            }>
                            STOP
                        </button>
                    </div>
                </div>

                <Chart 
                    data={[5,4,3,2,1]} 
                    comparingIdx={comparingIdx}
                    sorted={sorted}
                    local={true}
                    type={typeOfAlgo}
                />
            </div>
        </div>
    )
}
export default CompareBlock



/*     //RULES
    let lengthHolder
    let arrayHolder
    let speedHolder
    if(syncMode){
        //if sync is on -> recieve data from <Main Section/> Sync Input
        //SYNC MODE GLOBAL STATES
        lengthHolder = length
        arrayHolder = array
        speedHolder = speed
        // handleInputIsOn(true)
    } else {
        //if sync is off -> recieve data  from <CompareBlock/> Input
        //LOCAL STATES
        lengthHolder = localLength
        arrayHolder = localArray
        speedHolder = localSpeed
        // handleInputIsOn(false)
    }
 */


/*     const stop = (idFunc, arr, swaps) => { 
        let arrHolder = [...arr]
        clearTimeout(idFunc)
        setLocalStop((prev)=>!prev)
        setComparingIdx(null)
        setSorted(null)
        handleChangeArray(arrHolder)
    } */