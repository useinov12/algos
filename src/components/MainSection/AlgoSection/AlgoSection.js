import React, { useEffect, useReducer, useState } from 'react'
import Inputs from '../Inputs/Inputs'
import './algo-section.css'
import AlgoComp from './AlgoComp'
import PlayMenu from '../PlayMenu/PlayMenu'
import { createArray, createRandomArray } from '../../../functions/functions'
import { bubbleSort, quickSort } from '../../../functions/functions'

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



    //ALGOCOMP STATE
    const [ isRunningLocal, setIsRunningLocal ] = useState('initial')
    const handleIsRunningLocalChange = (state) => setIsRunningLocal(state)
    //Algo Section: Choosing and formating or running chosen algorithm
    function reducerAlgo(state, action){
        //Formating Data for choosen Algorithm
        if(action.type.command === 'format'){
            switch(action.type.algo){
                case 'Bubble' :
                    return {  isSorted:false, array:[...inputState.array], pivots:{compareIdx:0, sorted:0}, nextMove: 'compare' }
                case 'Quick' :
                    let left = 0
                    let right = inputState.array.length-1
                    let piv = Math.floor((left+right)/2)
                    return {  isSorted:false, array:[...inputState.array], pivots:{leftIdx:left, rightIdx:right, pivotIdx:piv}, listOfSubArrays:[[left,right]], nextMove: 'sort' }
                case 'Merge' :
                    return {isSorted:false, array:[...inputState.array], nextMove:'none'}
                case 'Selection' :
                    return {isSorted:false, array:[...inputState.array], nextMove:'none'}
            }
        } else 
        //Running choosen Algorithm
        if(action.type.command === 'run'){
            switch(action.type.algo){
                case 'Bubble': return  bubbleSort(state)
                case 'Quick': return  quickSort(state)
                case 'Merge': return  state
                case 'Selection': return  state
            }
        }
    }
    const [ algoState, dispatchAlgo ] = useReducer(reducerAlgo, {isSorted:false, array:[], pivots:{}})

    //Update/format data on InputData Change according to algo format
        useEffect(() => {  
            dispatchAlgo( {type:{algo:typeOfAlgo, command:'format'}} )
        }, [  ])
        
        useEffect(() => {  
            dispatchAlgo({type:{algo:typeOfAlgo, command:'format'}})
        }, [ inputState, typeOfAlgo ])

    //Sync state switches localRunning state
        useEffect(() => {
            if(isRunningSync === 'run')return setIsRunningLocal('run')
            if(isRunningSync === 'pause')return setIsRunningLocal('pause')
        }, [isRunningSync])
 
    //Reset local input
        useEffect(()=>{
            if(isRunningLocal === 'reset')dispatchLocalInput({type:'changeArray'})
        }, [ isRunningLocal])

        //Turn off running algo if switched from local to sync
        useEffect(() => {
            if(syncMode)return setIsRunningLocal('initial') 
        }, [syncMode])

        //Algo is running locally with Interval
        useEffect(() => {
            if(isRunningLocal === 'run'){
                let id = window.setInterval( ()=>
                dispatchAlgo( {type:{algo:typeOfAlgo, command:'run'}}), inputState.speed )
                if(algoState.nextMove === 'eject')setIsRunningLocal('pause')
                return () => window.clearInterval(id)
            }
        }, [isRunningLocal, algoState]) //re-run when (isRunningLocal === true) && watch when algoState is changing



    const renderAlgo = () => {
        return (<div className='compare-block-content'> 
            { compareMode && 
                <div className={collapseWidth ? `collapse-container collapse-width` : `collapse-container`}>
                    <div className={ contract ? `collapse-section local` : 'collapse-section expanded local' }>
                        <Inputs  
                            syncMode={syncMode}
                            inputState={inputState}
                            dispatch={dispatchLocalInput}
                            className={`local-inputs compare-mode`}
                        />
                        <PlayMenu 
                            type={'local'}
                            syncMode={syncMode}
                            isRunningLocal={isRunningLocal}
                            handleIsRunningLocalChange={handleIsRunningLocalChange}
                        />
                    </div>
                </div>}

            
            <AlgoComp
                isRunningLocal={isRunningLocal}
                handleIsRunningLocalChange={handleIsRunningLocalChange}
                algoState={algoState}
                dispatchLocalInput={dispatchLocalInput}
                compareMode={compareMode}
                syncMode={syncMode}
                typeOfAlgo={typeOfAlgo}
                inputData={inputState}
                isRunningSync={isRunningSync}
            > {!compareMode && <>
                <Inputs  
                    syncMode={syncMode}
                    inputState={inputState}
                    dispatch={dispatchLocalInput}
                    className={`local-inputs single-mode`}
                />
                <PlayMenu 
                    type={'local'}
                    syncMode={syncMode}
                    isRunningLocal={isRunningLocal}
                    handleIsRunningLocalChange={handleIsRunningLocalChange}
                /></>}
            </AlgoComp>
        </div>)
    }

    
    return (
        <div id='compareBlock' className={ compareMode ? 'algo-section-block compare-block' : 'algo-section-block single-block'}>

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