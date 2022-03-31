import React, { useState, useEffect } from 'react'
import Inputs from '../Inputs/Inputs'
import Chart from '../../Chart/Chart'
import './compare-block.css'


function CompareBlock(props) {
    //GLOBAL SYNC STATES AND HANDLERS
    const {
        syncMode,
        array,
        handleChangeLength, 
        handleChangeArray, 
        handleChangeSpeed,
        handleRemoveFromCompareList,
        // handleChangeSortIsRunningSYNC,
        isRunning,
        compareList,
        length, 
        speed, 
        typeOfAlgo
    } = props 

    //LOCAL STATES AND HANDLERS
    const [sortIsRunningLocal, setSortIsRunningLocal ] = useState(false) //used inside Algo to turn off inputs

    //STATS STATES
    const [localStop, setLocalStop ] = useState(false)
    const [swaps, setSwaps ] = useState(0)
    
    //STATES FOR CHART ANIMATIONS
    const [comparingIdx, setComparingIdx] = useState(0)
    const [sorted, setSorted ] = useState(0)

    //local INPUTS STATE
    const [inputIsOn, setInputIsOn ] = useState(true)
    const [localLength, setLocalLength ] = useState(10)
    const [localArray, setLocalArray ] = useState([])
    const [localSpeed, setLocalSpeed ] = useState(10)

    //HANDLERS
    const handleChangeLocalLength = n => setLocalLength(parseInt(n))
    const handleChangeLocalArray = async (arr) => {
      let holder = [...arr]
      setLocalArray(holder)
    }
    const handleChangeLocalSpeed = n => setLocalSpeed(parseInt(n))
    const handleInputIsOn = (bool) => setInputIsOn(bool)


    //RULES
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

    //ALGOS FUNCTIONS
    const Bubble = async (arr, i,  j, t,) => {
        setSortIsRunningLocal(true);      
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
        else innerLoop(arr, i1, j1)
    }

    //Function selector container
    let sortTypeWrapper = { Bubble:()=>Bubble(arrayHolder, 0, 0, speedHolder) }
    if(!typeOfAlgo) sortTypeWrapper = () => console.log('no type')
    const stop = (idFunc, arr, swaps) => { 
        let arrHolder = [...arr]
        clearTimeout(idFunc)
        setLocalStop((prev)=>!prev)
        setComparingIdx(null)
        setSorted(null)
        handleChangeArray(arrHolder)
    }

    //Rules
    useEffect(()=>{
        if(!syncMode){
            handleInputIsOn(true)
            return
        }
        handleInputIsOn(false)
    }, [syncMode])
    // useEffect(() => {
    //     console.log('running SYNC CompareBlock: ', isRunning)
    //     if(!isRunning){
    //         return
    //     };
    //    return sortTypeWrapper[typeOfAlgo]
    // }, [isRunning])
    useEffect(() => {
        console.log('running SYNC CompareBlock: ', isRunning)
        // if(!isRunning){
        //     return
        // };
       return sortTypeWrapper[typeOfAlgo]
    }, [isRunning])


    return (
        <div className="compare-mode-block">
            <button
                disabled={sortIsRunningLocal ? true : false}  
                onClick={()=>
                    handleRemoveFromCompareList(compareList, typeOfAlgo)
                }>
                X
            </button>
            <Inputs
                handleChangeLength={handleChangeLocalLength} 
                handleChangeArray={handleChangeLocalArray}
                handleChangeSpeed={handleChangeLocalSpeed}
                array={localArray}
                speed={localSpeed}
                length={localLength}
                sortIsRunning={sortIsRunningLocal} 
                className={'local-inputs'}
                inputIsOn={inputIsOn}
            />
            <div className="compare-mode-algo">
                <div className="compare-mode-algo-info">
                    <div>Swaps: {swaps}</div>
                    <div>Some stats: ...</div>
                    <div>Complexity: O(n)</div>
                    <div className="compare-mode-algo-btn-container">
                        <button id="sort"
                            disabled={sortIsRunningLocal ? true : false} 
                            onClick={
                                // ()=>sort()
                                sortTypeWrapper[typeOfAlgo]
                            }>
                            SORT!
                        </button>

                        <button id="stop" 
                            onClick={
                                ()=>stop(sortTypeWrapper[typeOfAlgo], localArray, swaps)
                            }>
                            STOP
                        </button>
                    </div>
                </div>

                <Chart 
                    data={array} 
                    comparingIdx={comparingIdx}
                    sorted={sorted}
                    local={true}
                    type={typeOfAlgo}
                    localStop={localStop}
                />
            </div>
        </div>
    )
}
export default CompareBlock
