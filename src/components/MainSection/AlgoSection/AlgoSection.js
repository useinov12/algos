import React, { useEffect, useReducer, useState } from 'react'
import Inputs from '../Inputs/Inputs'
import './algo-section.css'
import AlgoComp from './AlgoComp'
import { createArray, createRandomArray } from '../../../functions/functions'

function AlgoSection(props) {
    const {
        syncMode, 
        compareMode,
        typeOfAlgo,
        inputStateSync, 
        isRunningSync,
        compareList,
        handleRemoveFromCompareList, 
        children
    } = props 

    //LOCAL INPUT STATE
    let arrInit = createRandomArray()
    let initInputState = {
        speed:45,
        length:60,
        array:[ ...arrInit ]
    }
    function reducerLocalInput(input, action){
        switch (action.type){
            case 'update': return { ...input, ...action.playload }
            case 'changeSpeed': return {...input, speed:action.playload}
            case 'changeLength': return {...input, length:action.playload}
            case 'changeArray':
                let array = createArray(input.length)
                return { ...input, array:array }
            case 'changeArrayRandom':
                let randomArr = createRandomArray()
                return { ...input, length : randomArr.length, array : randomArr }
            default : console.log('Throw Error from reducerInput')
        }
    }
    const [ inputState, dispatchLocalInput ] = useReducer(reducerLocalInput, initInputState)


    //DATA STREAM SWITCH: Sync/Local
    //Assign initial data stream 
    useEffect(() => {
        if(syncMode) return dispatchLocalInput({ type:'update', playload:inputStateSync });
        else return dispatchLocalInput( {type:'update', playload:inputState} )
    }, [])

    //Update InputState on input data change:  sync/local
    useEffect( () => {
        if(syncMode)return dispatchLocalInput({type:'update', playload:inputStateSync});
        else return dispatchLocalInput( {type:'update', playload:inputState} )
    }, [ inputStateSync ])

    //Animation for Input sync/individual switch 
    const [contract, setContract ] = useState(false)
    const [collapseWidth, setCollapseWidth ] = useState(false)
    useEffect(()=>{
        let timer
        if(syncMode)timer = setTimeout(()=> setContract(true), 0)
        else timer = setTimeout(()=> setContract(false), 200)
        return ()=> clearTimeout(timer)
    }, [syncMode])

    useEffect(()=>{
        let timer
        if(contract)timer = setTimeout(()=> setCollapseWidth(true), 0)
        else timer = setTimeout(()=> setCollapseWidth(false), 200)
        return ()=> clearTimeout(timer)
    },[contract])

    const renderAlgo = () => {
        return (<div className='compare-block-content'> 
            { compareMode && 
                <div className={collapseWidth ? `collapse-container collapse-width` : `collapse-container`}>
                    <div className={ contract ? `collapse-section` : 'collapse-section expanded' }>
                        <Inputs  
                            syncMode={syncMode}
                            inputState={inputState}
                            dispatch={dispatchLocalInput}
                            className={`local-inputs compare-mode`}
                        />
                    </div>
                </div>}

            <AlgoComp
                dispatchLocalInput={dispatchLocalInput}
                compareMode={compareMode}
                syncMode={syncMode}
                typeOfAlgo={typeOfAlgo}
                inputData={inputState}
                isRunningSync={isRunningSync}
            >
                {!compareMode && 
                    <Inputs  
                        syncMode={syncMode}
                        inputState={inputState}
                        dispatch={dispatchLocalInput}
                        className={`local-inputs single-mode`}
                    />}
            </AlgoComp>
        </div>)
    }

    return (
        <div className={ compareMode ? 'algo-section-block compare-block' : 'algo-section-block single-block'}>

            { compareMode && 
                <button 
                    className="remove-block-btn"
                    onClick={ ()=> handleRemoveFromCompareList( compareList, typeOfAlgo ) }> 
                    X
                </button> }
            
            { children ? children : renderAlgo() }

        </div>
    )
}

export default AlgoSection;