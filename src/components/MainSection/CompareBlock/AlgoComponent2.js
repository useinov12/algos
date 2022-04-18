import React, { useState, useEffect, useReducer } from 'react'
import Chart from '../../Chart/Chart'

function runBubble(state, action){
    const {compareIdx, array, isSorted, sorted} = state
    switch(action.type){
        // case 'init' :
        //     return {  isSorted:false, array:[...inputData.array], compareIdx:0, sorted:0, nextMove: 'compare' }
        case 'compare' :
            if( compareIdx === array.length && !isSorted )
            return { ...state, compareIdx : 0, sorted:sorted+1,  nextMove:'compare' };

            if( sorted === array.length )
            return { ...state, nextMove : 'sorted', isSorted: true }; //exit

            if (array[compareIdx] > array[compareIdx+1]) return { ...state, nextMove : 'swap' };
            else  return { ...state, compareIdx:compareIdx+1, nextMove:'compare'};
        case 'swap' :
            let arrHolder = []
            const swap = (arr, i) => {
                let arrHolderInner = [...arr]
                let holder = arrHolderInner[i]
                arrHolderInner[i] = arrHolderInner[i+1]
                arrHolderInner[i+1] = holder 
                arrHolder = [...arrHolderInner]
            }
            swap(array, compareIdx)
            return { ...state, array : [...arrHolder], compareIdx : compareIdx+1,  nextMove:'compare'} ;
            
        case 'sorted': return state;
    }
}





function AlgoComp({syncMode, typeOfAlgo, inputData, runState}) {
    const [ isRunningLocal, setIsRunningLocal ] = useState(false)
    const [ dataFormat, setDataFormat  ] = useState({})
    const handleDataFormat = (type) =>{
        switch(type){
            case 'Bubble':
                setDataFormat({isSorted:false, array:[...inputData.array], compareIdx:0, sorted:0, nextMove: 'compare' })
        }
    }
    //Algo Section
        function reducerAlgo(state, action){
            switch(action.type){
                case 'Bubble': 
                   return runBubble(state)
            }
        }
        const [ algoState, dispatchAlgo ] = useReducer(reducerAlgo, dataFormat)


    //Update on InputData Change
        useEffect(() => {  
           
        }, [ inputData ])

    //Timeout, clearTimeout set up
        useEffect(() => {
            if(runState === 'run')return setIsRunningLocal(true)
            if(runState === 'pause')return setIsRunningLocal(false)
        }, [runState])
        useEffect(() => {
            if(syncMode)return setIsRunningLocal(false) //turn of running algo if switched from local to sync
        }, [syncMode])

        //If Single Algo run
        useEffect(() => {
            if(isRunningLocal){
                let id = window.setInterval( ()=>dispatchAlgo(typeOfAlgo), inputData.speed )
                return () => window.clearInterval(id)
            }
        }, [isRunningLocal, pointer]) //pointer is abstraction for algoObjects
 

    return (
        <div className="algo-compnent" style={{padding:'1rem'}}>
        
            <div className="compare-mode-algo-info">
                <div>Some stats: ...</div>
                <div>Complexity: O(n)</div>
                <div className="compare-mode-algo-btn-container">
                    <button id="sort"
                        disabled={syncMode ? true : false} 
                        onClick={
                            ()=>setIsRunningLocal(true)
                        }> SORT!
                    </button>
                    <button id="stop" 
                        disabled={syncMode ? true : false} 
                        onClick={
                            ()=>setIsRunningLocal(false)
                        }> STOP
                    </button>
                </div>

                <button 
                    // disabled={}
                    onClick={
                        ()=>runAlgo(typeOfAlgo)
                    }>
                    Next Move
                </button>
                
            </div>

            <Chart                       /* ABSTRACT DATA FOR CHARTS,  mb make Pointer an object*/
                data={algoState.array} 
                comparingIdx={algoState.compareIdx}
                sorted={algoState.sorted}
                local={true}
                type={typeOfAlgo}
            />
        </div>
    )

}

export default AlgoComp
