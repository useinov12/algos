import React, { useState, useEffect, useReducer } from 'react'
import Inputs from '../Inputs/Inputs'
import Chart from '../../Chart/Chart'
import './compare-block.css'
import AlgoComp from './AlgoComp'


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

    // Global SYNC states
        const {
            syncMode,
            typeOfAlgo,
            inputStateSync,
            runState,
            compareList,
            handleRemoveFromCompareList } = props 

    // LOCAL INPUTS
        let arrInit = createArray(50)
        let initInputState = {
            speed:5,
            length:50,
            array:[...arrInit]
        }
        function reducerInput(input, action){
            switch (action.type){
                case 'update':
                    return { ...input, ...action.playload }
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
        const [ inputState, dispatchInput ] = useReducer(reducerInput, initInputState)



    //DATA STREAM SWITCH: Sync/Local
        //Assign initial data stream 
        useEffect(() => {
            if(syncMode)return dispatchInput( { type:'update', playload:inputStateSync } )
            else return dispatchInput( {type:'update', playload:inputState} )
        }, [])

        //Update InputState on input data change:  sync/local
        useEffect( () => {
            if(syncMode){
                dispatchInput( {type:'update', playload:inputStateSync} )
                return
            }
           return dispatchInput( {type:'update', playload:inputState} )
        }, [ inputStateSync ])


    //Interval State 
        const [interval, setInterval ] = useState(false)



    return (
        <div className="compare-mode-block">
            <button className="remove-compare-block-btn"
                onClick={()=>
                    handleRemoveFromCompareList(compareList, typeOfAlgo)
                }> X
            </button>

            <Inputs
                syncMode={syncMode}
                inputState={inputState}
                dispatch={dispatchInput}
                className={'local-inputs'}
            />

            <AlgoComp
                syncMode={syncMode}
                typeOfAlgo={typeOfAlgo}
                inputData={inputState}
                runState={runState}
                intervalState={interval}
            />
        </div>
    )
}

export default CompareBlock




















    // //Switch SyncState actions 
    // useEffect( () => {
    //     switch(runState){
    //         case 'initial' :
    //             console.log({runState:'initial'})
    //             return () => {} //do nothing default

    //         case 'run' :
    //             console.log({runState:'run'})
    //             //updating LocalData in algorithm function
    //             runAlgo( typeOfAlgo, localData.array, localData.sorted, localData.compareIdx, localData.speed ) //run algo with initial props
    //             return () => {} //do nothing 
    //         case 'pause' :
    //             console.log({runState:'pause'})
    //             //ClearTimeout stateChange
    //             return () => {
    //                 //clear Local here
    //             }
    //         case 'continue':
    //              //setTimeout State
    //             //runAlgo
    //             console.log({runState:'continue'}) 
    //             return () => {
    //                 //clear snapshot here
    //             } 

    //         case 'reset' : 
    //             console.log({runState:'reset'})
                
    //             return  () =>{
    //                 //clear all here
    //             }
    //     }
        
    // }, [runState])


        // //ALGORITHMS
        // let delay = async ( t ) => await new Promise((resolve)=>setTimeout(resolve, t))
        // const swap = async (arr, i, t) => {
        //     // await delay(t)
        //     let holder = arr[i]
        //     arr[i] = arr[i+1]
        //     arr[i+1] = holder
        //     dispatchLocal({type:'update', playload:{array:arr}})
        // }

        // const Bubble = async (arr, i,  j, t,) => {
        //     // await delay(t)
        //     dispatchLocal({type:'update', playload:{sorted:i}})
        //     let innerLoop = async (arr, i, j) => {
        //         if(j>=arr.length-1-i)Bubble(arr, i+1, 0, t);
        //         else {
        //             // await delay(t)
        //             dispatchLocal({type:'update', playload:{compareIdx:j}})
        //             if(arr[j]>arr[j+1]){
        //                 // await delay(t)
        //                 swap(arr, j, t)
        //                 innerLoop(arr, i, j+1)
        //             } 
        //             else innerLoop(arr, i, j+1)
        //         }
        //     } 
        //     // await delay(t)
        //     if(i>=arr.length-1)return
        //     else innerLoop(arr, i, j)
        // }

