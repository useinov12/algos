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
    createArray(length)
}


function CompareBlock(props) {
    // Global sync states
        const {
            syncMode,
            typeOfAlgo,
            inputStateSync,
            runState,
            compareList,
            handleRemoveFromCompareList } = props 

    // Local INPUTS
        let arrInit = createArray(50)
        let InitSyncInputState = {
            speed:5,
            length:50,
            array:[...arrInit]
        }
        function reducer(input, action){
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
            return input
        }
        const [ inputState, dispatch ] = useReducer(reducer, InitSyncInputState)


    //Data stream switch Sync/Local
        let algoInputStateHolder = {
            array:[],
            compareIdx:0,
            sorted:0, 
            speed:5 
        } //boilerplate

        useEffect(() => { 
            if(syncMode) return algoInputStateHolder = inputStateSync 
            else algoInputStateHolder = inputState
        }, []) //switch on Mode Change


    
    //Local States
        let initLocal = {
            array:[...algoInputStateHolder.array],
            compareIdx:0,
            sorted:0,
            speed:algoInputStateHolder.speed
        }
        function reducerLocalStates(localStates, action){
            switch(action.type){
                case 'update':
                    return { ...localStates, ...action.playload }
                case 'clear' :
                    return {...localStates, ...{ array:[],compareIdx:0,sorted:0,speed:algoInputStateHolder.speed }}
            }
        }  
        const [ localData, dispatchLocal ] = useReducer(reducerLocalStates, initLocal)

        //Update LocalData on Input change
        useEffect(() => {
            if(syncMode){
                dispatchLocal({type:'update', playload:inputStateSync})
                return
            }
            dispatchLocal({type:'update', playload:inputState})
            return () => {}
        }, [ inputStateSync, inputState ])

        //Test localData 
        useEffect(() => {
            console.log(`LocalData: `, localData)
            return
        }, [localData])



    //State for Pause/SnapShot
        let initStatic = {
            array:[],
            compareIdx:0,
            sorted:0
        }
        function reducerStaticData(state, action){
            switch(action.type){
                case 'snapshot':
                    return {...state, ...action.playload} 
            }
        } 
        const [ snapshot, dispatchSnapshot ] = useReducer(reducerStaticData, initStatic)

        //Snapshot test
        useEffect(() => {
            console.log(`Snapshot: `, snapshot)
            return
        }, [snapshot])



    //ALGOS
        let delay = async ( t ) => await new Promise((resolve)=>setTimeout(resolve, t))
        const swap = async (arr, i, t) => {
            await delay(t)
            let holder = arr[i]
            arr[i] = arr[i+1]
            arr[i+1] = holder
            dispatchLocal({type:'update', playload:{array:arr}})
        }

        const Bubble = async (arr, i,  j, t,) => {
            await delay(t)
            dispatchLocal({type:'update', playload:{sorted:i}})
            let innerLoop = async (arr, i, j) => {
                if(j>=arr.length-1-i)Bubble(arr, i+1, 0, t);
                else {
                    await delay(t)
                    dispatchLocal({type:'update', playload:{compareIdx:j}})
                    if(arr[j]>arr[j+1]){
                        await delay(t)
                        swap(arr, j, t)
                        innerLoop(arr, i, j+1)
                    } 
                    else innerLoop(arr, i, j+1)
                }
            } 
            await delay(t)
            
            if(i>=arr.length-1)return
            else innerLoop(arr, i, j)
        }

        //Choose algo
        function runAlgo(action, array, compareIdx, sorted, speed){
            switch(action){
                case 'Bubble' :
                    Bubble(array, compareIdx, sorted, speed)
                break
            }
        }

        //Switch action
        useEffect( () => {
            switch(runState){
                case 'initial' :
                    console.log({runState:'initial'})
                    return () => {} //do nothing default

                case 'run' :
                    //Run algorithm
                    //updating LocalData in algorithm function
                    console.log({runState:'run'})
                    runAlgo( typeOfAlgo, localData.array, localData.sorted, localData.compareIdx, localData.speed ) //run algo with initial props
                    return () => {} //do nothing 

                case 'pause' :
                    //Taking Snapshot from current LocalData
                    //Clear LocalData
                    //ClearTimeout state change call
                    console.log({runState:'pause'})
                    dispatchSnapshot({type:'snapshot', playload:localData})
                    return () => {
                        //clear Local here
                    }

                case 'continue':
                    //Assign SnapshotData to LocalData
                    //Clear Snapshot Data
                    //Switch runState to 'run'
                    console.log({runState:'continue'}) //run with snapshot props
                    // runAlgo(typeOfAlgo, arraySnapshot, comparingIdxSnapshot, sortedSnapshot, inputStateHolder.speed)
                    return () => {
                        //clear snapshot here
                        dispatchSnapshot({type:'snapshot'}) //cnahge to type:clearSnapshot
                    } 

                case 'reset' : 
                    //ClearTimeout state change call
                    //Clear LocalData
                    //Clear Snapshot Data
                    //Dispatch new array
                    //Switch runState to 'initial'
                    console.log({runState:'reset'})
                    
                    return  () =>{
                        //clear all here
                        dispatchLocal({type:'clear'})
                    }
            }
            
        }, [runState])

        //Timeout, clearTimeout set up
        useEffect(() => {
            
            return () => {
                
            }
        }, [runState])


    //Render chart based on current data stream
        const renderChart = (state) =>{
            switch(state){
                case 'initial':
                    return (
                        <Chart />
                    )
                case 'run':
                    return (
                        <Chart />
                    )
                case 'pause':
                    return (
                        <Chart />
                    )
                case 'continue':
                    return (
                        <Chart />
                    )
                case 'reset':
                    return
            }
        }
    return (
        <div className="compare-mode-block">
            <button
                onClick={()=>
                    handleRemoveFromCompareList(compareList, typeOfAlgo)
                }>
                X
            </button>

            <Inputs
                syncMode={syncMode}
                inputState={syncMode ? inputState : algoInputStateHolder}
                dispatch={dispatch}
                className={'local-inputs'}
            />

            <div className="compare-mode-algo">
                <div className="compare-mode-algo-info">
                    <div>Some stats: ...</div>
                    <div>Complexity: O(n)</div>
                    <div className="compare-mode-algo-btn-container">
                        <button id="sort"
                            disabled={syncMode ? true : false} 
                            onClick={
                                ()=>true
                            }> SORT!
                        </button>

                        <button id="stop" 
                            disabled={syncMode ? true : false} 
                            onClick={
                                ()=>true
                            }> STOP
                        </button>
                    </div>
                </div>


                {/* CHART */}
                <Chart 
                    data={localData.array} 
                    comparingIdx={localData.compareIdx}
                    sorted={localData.sorted}
                    local={true}
                    type={typeOfAlgo}
                />

            </div>
        </div>
    )
}
export default CompareBlock
