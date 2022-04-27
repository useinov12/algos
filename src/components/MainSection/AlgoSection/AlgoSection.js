import React, { useEffect, useReducer } from 'react'
import Inputs from '../Inputs/Inputs'
import './algo-section.css'
import AlgoComp from './AlgoComp'

const randomizer = (n) => Math.floor(Math.random()*n)

const randomizeArray = (array) =>{
    let n = array.length
    let t; let i;

    while(n){
        i = Math.floor(Math.random()* n--);
        t = array[n]
        array[n] = array[i]
        array[i] = t
    }
    return array
}
const createArray = (length) => {
    let array = []
    for(let i=0; i<length; i++){
        array.push(i)
    }
    randomizeArray(array)
    return array
}

function AlgoSection(props) {
        const {
            syncMode, 
            typeOfAlgo,
            inputStateSync, //global input data
            isRunningSync,
            compareList,
            handleRemoveFromCompareList
        } = props 

    //LOCAL INPUTS
        let arrInit = createArray(20)
        let initInputState = {
            speed:5,
            length:20,
            array:[ ...arrInit ]
        }
        function reducerInput(input, action){
            switch (action.type){
                case 'update': return { ...input, ...action.playload }
                case 'changeSpeed': return {...input, speed:action.playload}
                case 'changeLength': return {...input, length:action.playload}
                case 'changeArray':
                    let array = createArray(input.length)
                    return { ...input, array:array }
                case 'changeArrayRandom':
                    let randomLength =  randomizer(100)
                    let randomArr = createArray(randomLength)
                    return { ...input, length : randomLength, array : randomArr }
                default : console.log('Throw Error from reducerInput')
            }
        }
        const [ inputState, dispatchInput ] = useReducer(reducerInput, initInputState)


    //DATA STREAM SWITCH: Sync/Local
        //Assign initial data stream 
        useEffect(() => {
            if(syncMode) return dispatchInput({ type:'update', playload:inputStateSync });
            else return dispatchInput( {type:'update', playload:inputState} )
        }, [])

        //Update InputState on input data change:  sync/local
        useEffect( () => {
            if(syncMode)return dispatchInput({type:'update', playload:inputStateSync});
            else return dispatchInput( {type:'update', playload:inputState} )
        }, [ inputStateSync ])


    return (
        <div className="compare-mode-block">

            <button 
                className="remove-block-btn"
                onClick={ ()=> handleRemoveFromCompareList( compareList, typeOfAlgo ) }> 
                X
            </button>
            
            { 
                !syncMode && 
                <Inputs
                    syncMode={syncMode}
                    inputState={inputState}
                    dispatch={dispatchInput}
                    className={'local-inputs'}
                />
            }

            <AlgoComp
                syncMode={syncMode}
                typeOfAlgo={typeOfAlgo}
                inputData={inputState}
                isRunningSync={isRunningSync}
            />
        </div>
    )
}

export default AlgoSection;