import React, { useState, useEffect, useReducer } from 'react'
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import Chart from '../../Chart/Chart'
import { bubbleSort, quickSort } from '../../../functions/functions'


function AlgoComp( { dispatchLocalInput,  syncMode, typeOfAlgo, inputData, isRunningSync} ) {
    const [ isRunningLocal, setIsRunningLocal ] = useState('initial')
    //Algo Section: Choosing and formating or running chosen algorithm
    function reducerAlgo(state, action){
        //Formating Data for choosen Algorithm
        if(action.type.command === 'format'){
            switch(action.type.algo){
                case 'Bubble' :
                    return {  isSorted:false, array:[...inputData.array], pivots:{compareIdx:0, sorted:0}, nextMove: 'compare' }
                case 'Quick' :
                    let left = 0
                    let right = inputData.array.length-1
                    let piv = Math.floor((left+right)/2)
                    return {  isSorted:false, array:[...inputData.array], pivots:{leftIdx:left, rightIdx:right, pivotIdx:piv}, listOfSubArrays:[[left,right]], nextMove: 'sort' }
                case 'Merge' :
                    return {isSorted:false, array:[...inputData.array], nextMove:'none'}
                case 'Selection' :
                    return {isSorted:false, array:[...inputData.array], nextMove:'none'}
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
            dispatchAlgo({type:{algo:typeOfAlgo, command:'format'}})
        }, [  ])
        
        useEffect(() => {  
            dispatchAlgo({type:{algo:typeOfAlgo, command:'format'}})
        }, [ inputData ])

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
                dispatchAlgo( {type:{algo:typeOfAlgo, command:'run'}}), inputData.speed )
                if(algoState.nextMove === 'eject')setIsRunningLocal('pause')
                return () => window.clearInterval(id)
            }
        }, [isRunningLocal, algoState]) //re-run when (isRunningLocal === true) && watch when algoState is changing

    return (
        <div className={'algo-comp'}>

            <div className='local-algo-buttons'>
                <div className={ syncMode ? 'local-play-menu-off' : 'local-play-menu-on'}>
                    <button className={isRunningLocal === 'reset' ? 'local-play-btn local-play-btn__active' :  'local-play-btn local-play__passive' }
                        disabled={isRunningLocal === 'run' || syncMode ? true : false} 
                        onClick={()=>setIsRunningLocal('reset')}> 
                            <FaStop/>
                    </button>
                    <button className={isRunningLocal  === 'run' ? 'local-play-btn local-play-btn__active' :  'local-play-btn local-play__passive' }
                        disabled={syncMode ? true : false} 
                        onClick={()=>setIsRunningLocal('run')}> 
                            <FaPlay/>
                    </button>
                    <button className={isRunningLocal === 'pause' ? 'local-play-btn local-play-btn__active' :  'local-play-btn local-play__passive' }
                        disabled={syncMode ? true : false} 
                        onClick={()=>setIsRunningLocal('pause')}> 
                        <FaPause/>
                    </button>
                </div>

                <button 
                    className='local-next-step'
                    disabled={isRunningLocal === 'run' ? true : false}
                    onClick={()=>dispatchAlgo({type: {algo:typeOfAlgo, command:'run'} })}>
                    next step
                </button>
            </div>

            <Chart                       
                data={algoState.array}
                pivots={algoState.pivots}
                isSorted = {algoState.isSorted}
                local={true}
                type={typeOfAlgo}
            /> 
            
        </div>
    )
}

export default AlgoComp