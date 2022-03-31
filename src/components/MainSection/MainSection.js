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
    const handleSyncModeChange = () => setSyncMode(prev => !prev)

    //SyncInput states
    let initArr = createArray(50)
    let InitSyncInputState = {
        speed:50,
        length:50,
        array:[...initArr]
    }
    function  reducer(input, action){
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
    const [ inputState, dispatch ] = useReducer(reducer, InitSyncInputState)

    useEffect(() => {
        // console.log(inputState)

    }, [inputState])

    //ALGOS FUNCTIONS
    const [sortIsRunningLocal, setSortIsRunningLocal ] = useState(false) //used inside Algo to turn off inputs
    const Bubble = async (arr, i,  j, t,) => {
/*         setSortIsRunningLocal(true);      
        const swap = (arr, i) => {
            let holder = arr[i]
            arr[i] = arr[i+1]
            arr[i+1] = holder
            setSwaps(prev => prev+=1)
        }
        const delay = async ( t ) => await new Promise((resolve)=>setTimeout(resolve, t))
        let  i1 = i
        let j1 = j
        let t1= t

        await delay(t)
        setSorted(i1)
        const innerLoop = async (arr, i, j) =>{
            if(j>=arr.length-1-i)Bubble(arr, i+1, 0, t1);
            else {
                await delay(t)
                setComparingIdx(j)
                if(arr[j]>arr[j+1]){
                    await delay(t)
                    swap(arr, j)
                    innerLoop(arr, i, j+1)
                } 
                else innerLoop(arr, i, j+1)
            }
        } 
        
        if(i>=arr.length-1){
            setSortIsRunningLocal(false)
            return
        } 
        else innerLoop(arr, i1, j1) */
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
                <button disabled={compareMode ? false : true} 
                    onClick={()=>handleSyncModeChange()}>
                    {syncMode ? 'on' : 'off'}
                </button>
                <span>   </span>
                <span>
                    <button
                        disabled={syncMode ? false : true} 
                        onClick={()=>(true)}>
                        RUN SYNC
                    </button> 
                    <button
                        disabled={syncMode ? false : true} 
                        onClick={()=>(console.log('stop'))}>
                        PAUSE
                    </button> 
                </span>
            </div>
            {/* COLLAPSE SYNC INPUTS HERE */}
            {   
                syncMode &&
                <Inputs
                    inputState={inputState}
                    dispatch={dispatch}
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