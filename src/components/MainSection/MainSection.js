import React, { useState, useEffect, useReducer } from 'react'
import Inputs from './Inputs/Inputs'
import CompareBlock from './CompareBlock/CompareBlock'
import BubbleSort from '../Algos/BubbleSort'
import QuickSort from '../Algos/QuickSort'
import MergeSort from '../Algos/MergeSort'
import SelectionSort from '../Algos/SelectionSort'

import './main-section.css'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import { findAllByDisplayValue } from '@testing-library/dom'


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
  

function MainSection({handleChangeMode, compareMode, handleAddToCompareList, handleRemoveFromCompareList, compareList}) {

    const [ syncMode, setSyncMode ] = useState(false)

    //SYNC STATES - refactor into single useReducer?
    const [ isRunning, setIsRunning ] = useState(false)
    const [ array, setArray ] = useState(createArray(50))
    
    //SYNC INPUTS
    const [inputIsOn, setInputIsOn ] = useState(true) 
    const [length, setLength ] = useState(array.length)
    const [speed, setSpeed ] = useState(10)
    //handlers
    const handleInputIsOn = (bool) => setInputIsOn(bool) 
    const handleChangeLength = n => setLength(parseInt(n))
    const handleChangeArray = async (arr) => {
        let holder = [...arr]
        setArray(holder)
    }
    const handleChangeSpeed = n => setSpeed(parseInt(n))

    //SYNC MODE HANDLERS    
    const handleIsRunningChange = () => setIsRunning(prev => !prev) //set false when all algos in sync is done
    const handleChangeSyncMode = () =>{
        setSyncMode((prev)=> !prev)
        // setIsRunning(prev => !prev)
    }

    return (
        <div className="content-container content-grid grid">
            <div>
                <span>Compare Mode is</span> 
                <NavLink to={compareMode ? "/bubblesort" : "/compare-mode"}>
                    <button onClick={()=>handleChangeMode()}>
                        {compareMode ? 'on' : 'off'}
                    </button>
                </NavLink>

                <span>SYNC Mode is</span>
                <button onClick={()=>handleChangeSyncMode()}>
                    {syncMode ? 'on' : 'off'}
                </button>
                <span>   </span>
                <span>
                    <button
                        disabled={syncMode ? false : true} 
                        disabled={isRunning ? true : false} 
                        onClick={()=>handleIsRunningChange()}>
                        RUN SYNC
                    </button> 
                    <button
                        disabled={isRunning ? false : true} 
                        onClick={()=>(console.log('stop'))}>
                        PAUSE
                    </button> 
                </span>
            </div>

            {/* COLLAPSE SYNC INPUTS HERE */}
            <Inputs             
                length={length} 
                handleChangeLength={handleChangeLength} 
                handleChangeArray={handleChangeArray}
                array={array}
                handleChangeSpeed={handleChangeSpeed}
                speed={speed}
                className={'inputs-container inputs-grid grid'}
                inputIsOn={isRunning}
            /> 
            {/* COLLAPSE/MUTE SYNC MODE HERE */}

            {/* ALL ROUTES */}
            <div>
                <Routes>
                    <Route path="/compare-mode" exact element={
                        compareList.map((algo, i)=>
                            <CompareBlock
                                key={i}
                                syncMode={syncMode}
                                array={array}
                                handleChangeLength={handleChangeLength} 
                                handleChangeArray={handleChangeArray}
                                handleChangeSpeed={handleChangeSpeed}
                                handleRemoveFromCompareList={handleRemoveFromCompareList}
                                // handleChangeSortIsRunningSYNC={handleChangeSortIsRunningSYNC}
                                isRunning={isRunning}
                                compareList={compareList} 
                                length={length}
                                speed={speed}
                                typeOfAlgo={algo}
                            />
                        )
                    }/>
                    <Route path="/bubblesort" exact element={
                        <BubbleSort array={array} handleChangeArray={handleChangeArray} length={length} speed={speed}/>}
                    />
                    <Route path="/quicksort" exact element={
                        <QuickSort array={array} handleChangeArray={handleChangeArray} length={length} />}
                    />
                    <Route path="/mergesort" exact element={
                        <MergeSort array={array} handleChangeArray={handleChangeArray} length={length} />}
                    />
                    <Route path="/selectionsort" exact element={
                        <SelectionSort array={array} handleChangeArray={handleChangeArray} length={length} />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default MainSection
