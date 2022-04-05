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
    //SyncMode switch
    const [ syncMode, setSyncMode ] = useState(false)
    const handleSyncModeChange = () =>{
        setSyncMode(prev => !prev)
    } 

    //SyncInput states
    let initArr = createArray(50)
    let InitSyncInputState = {
        speed:5,
        length:50,
        array:[...initArr]
    }
    function  reducerArrayState(input, action){
        switch (action.type){
            case 'changeSpeed':
                return {...input, speed:action.playload}
            case 'changeLength':
                return {...input, length:action.playload}
            case 'changeArray':
                let array = createArray(input.length)
                return {...input, array:array}
            case 'changeArrayRandom':
                let l =  randomizer(300)
                let arr = createArray(l)
                return {...input, array:arr}
        }
    }
    const [ inputState, dispatchArray ] = useReducer(reducerArrayState, InitSyncInputState)
    
    //SyncInput Test
    useEffect(() => {
        // console.log(inputState)
        return () => {
            
        }
    }, [inputState])



    let initRunState = 'initial' 
    function runSyncReducer(runState, action){
        switch(action.type){
            case 'run':
                return 'run'
            case 'pause':
                return 'pause'
            case 'reset':
                return 'reset'
            case 'initial':
                return 'initial'
            case 'continue':
                return 'continue'
        }
    }  
    const [ runState, dispatchRun ] = useReducer(runSyncReducer, initRunState)

    useEffect(() => {
        // console.log(runState)
        // console.log(compareList)

    }, [runState])

    useEffect(() => {
        if(syncMode)return dispatchArray({type:'changeArray'})
        else return
    }, [syncMode])


    //buttons disable handlers
    const handleDisableCompareBtn = () => {
        if(runState == 'run' ) return true;
        if(runState == 'pause' ) return true;
        else return false;
    }
    const handleDisableSyncBtn = () =>{
        if(!compareMode) return true;
        if(runState == 'run' ) return true;
        if(runState == 'pause' ) return true;
        else return false;
    }
    const handleDisableRunSyncBtn = () =>{
        if(!syncMode || !compareMode) return true;
        if(runState === 'run' ) return true;
        else return false;
    }
    const handleDisablePauseBtn = () =>{
        if(!syncMode || !compareMode) return true;
        if(runState !== 'run') return true;
        else return false;
    }
    const handleDisableResetBtn = () =>{
        if(!syncMode || !compareMode) return true;
        if(runState !== 'pause') return true;
        else return false;
    }


    return (
        <div className="content-container content-grid grid">
            <div>
                <span>Compare Mode is</span> 
                <NavLink to={compareMode ? "/bubblesort" : "/compare-mode"}>
                    <button 
                        disabled={handleDisableCompareBtn()} 
                        onClick={()=>handleChangeMode()}>
                        {compareMode ? 'on' : 'off'}
                    </button>
                </NavLink>

                <span>SYNC Mode is</span>
                <button 
                    disabled={handleDisableSyncBtn()} 
                    onClick={()=>handleSyncModeChange()}>
                    {syncMode ? 'on' : 'off'}
                </button>
                <span>   </span>
                <span>
                    <button
                        disabled={handleDisableRunSyncBtn()} 
                        onClick={()=>{
                            if(compareList.length===0) return prompt(' Add Algo before compare ');
                            if(runState === 'pause'){
                                console.log(runState)
                                dispatchRun({type:'continue'})
                            }
                            else dispatchRun({type:'run'});
                        }}>
                        {runState === 'pause' ? 'CONTINUE' : 'RUN SYNC'}
                    </button> 
                    <button
                        disabled={handleDisablePauseBtn()}
                        onClick={()=>dispatchRun({type:'pause'})}>
                        PAUSE
                    </button> 
                    <button
                        disabled={handleDisableResetBtn()}
                        onClick={()=>dispatchRun({type:'reset'})}>
                        RESET
                    </button> 
                </span>
            </div>
            {/* COLLAPSE SYNC INPUTS HERE */}
            {   
                (syncMode && compareMode) &&
                <Inputs
                    inputState={inputState}
                    dispatch={dispatchArray}
                    runState={runState}
                    className={'inputs-container inputs-grid grid'}
                />
            } 

            {/* ALL ROUTES */}
            <div>
                <Routes>
                    <Route path="/compare-mode" exact element={
                        compareList.map((algo, i)=>
                            <CompareBlock
                                key={i}
                                typeOfAlgo={algo}
                                syncMode={syncMode}
                                inputStateSync={inputState}
                                runState={runState}
                                compareList={compareList}
                                handleRemoveFromCompareList={handleRemoveFromCompareList}
                            />
                        )
                    }/>
                </Routes>
            </div>
        </div>
    )
}

export default MainSection

/* <Route path="/bubblesort" exact element={
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
/> */