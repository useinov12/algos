import React, { useState, useEffect, useReducer } from 'react'
import Chart from '../../Chart/Chart'


const swap = (arr, i) => {
    let holder = arr[i]
    arr[i] = arr[i+1]
    arr[i+1] = holder 
}


function AlgoComp(props) {
    const {
        syncMode, 
        typeOfAlgo, 
        inputData, 
        runState
    } = props

    const [ isRunningLocal, setIsRunningLocal ] = useState(false)
    const [ isSortedLocal, setIsSortedLocal ] = useState(false)

    //Algo Section
        //Bubble
        let initBubbleState = {
            isSorted:false,
            array:[],
            compareIdx:0,
            sorted:0,
            nextMove: 'check' //store next move here
        }
        function reducerBubble(state, action){
            switch(action.type){
                case 'init' :
                    //asign array here
                    return {  isSorted:false, array:[...inputData.array], compareIdx:0, sorted:0, nextMove: 'check' }

                case 'check' :
                    console.log('checked')
                    if ( state.array.length !== state.sorted ) return { ...state, nextMove : 'compare' }
                    else  return { ...state, nextMove : 'sorted', isSorted: true };

                case 'compare' :
                    console.log( {stateArray:state.array} )
                    if( state.compareIdx === state.array.length && !state.isSorted ) 
                    return { ...state, compareIdx : 0, sorted:state.sorted+1,  nextMove:'compare'};

                    if(state.sorted === state.array.length ) return { ...state, nextMove:'check'};

                    if (state.array[state.compareIdx] > state.array[state.compareIdx+1]) return { ...state, nextMove : 'swap' };
                    else  return { ...state, compareIdx:state.compareIdx+1, nextMove:'compare'};

                case 'swap' :
                    let arrHolder = []
                    const swap = (arr, i) => {
                        let arrHolderInner = [...arr]
                        let holder = arrHolderInner[i]
                        arrHolderInner[i] = arrHolderInner[i+1]
                        arrHolderInner[i+1] = holder 
                        arrHolder = [...arrHolderInner]
                    }
                    //perform swap
                    console.log('swapped')
                    swap(state.array, state.compareIdx)
                    console.log({Holder:arrHolder})
                    return { ...state, array : [...arrHolder], compareIdx : state.compareIdx+1,  nextMove:'compare'} 



                case 'sorted' :
                    //clear intervals here
                    return state
                case 'pause' :
                    //clear intervals here
                    return {...state, nextMove: null}
            }
        }
        const [ bubbleState, dispatchNextMoveBubble ] = useReducer( reducerBubble, initBubbleState )
        //Initial assign
        // useEffect(() => {
        //     dispatchNextMoveBubble({type:'init'})
        // }, [])
        //update on InputData Change
        useEffect(() => {
            dispatchNextMoveBubble({type:'init'})
        }, [ inputData ])


    //Timeout, clearTimeout set up
    useEffect(() => {
        console.log({runsState:runState})
        return () => {
            
        }
    }, [runState])
        //if SyncMode
        useEffect(() => {
            if(runState === 'run'){
                //let id = window.setInterval with dispatchNextMoveBubble
                console.log({SyncState:'running syncroniously'})
                return
            }
            if(runState === 'pause'){
                //window.clearInterval(id)
                console.log({SyncState:'pause syncroniously'})
                return
            }
            return () => {
                //window.clearInterval(id)
                console.log('eject')
            }
        }, [runState])


        //if Single Algo run
        useEffect(() => {
            if(isRunningLocal){
                //let id = window.setInterval with dispatchNextMoveBubble
            }
            return () => {
                //window.clearInterval(id)
            }
        }, [isRunningLocal])

    
    //Choose algo to run
    function runAlgo(action){
        switch(action){
            case 'Bubble' :
                //CHANGE TO reducerBubble HERE
                // dispatchNextMoveBubble(array, compareIdx, sorted, speed) ??
                dispatchNextMoveBubble({type:`${bubbleState.nextMove}`}) //dynamicaly dispatch next move
            break 
        }
    }

    
    return (
        <div className="algo-compnent">
        
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

                <div>
                    <button 
                        // disabled={}
                        onClick={
                            ()=>runAlgo(typeOfAlgo)
                        }>
                        Next Move
                    </button>
                </div>
            </div>

            {/* <Chart 
                data={inputData.array} 
                type={typeOfAlgo}
                local={true}
            /> */}

            <Chart 
                data={bubbleState.array} 
                comparingIdx={bubbleState.compareIdx}
                sorted={bubbleState.sorted}
                local={true}
                type={typeOfAlgo}
            />

        </div>
    )

}

export default AlgoComp


// <Chart 
// data={localData.array} 
// comparingIdx={localData.compareIdx}
// sorted={localData.sorted}
// local={true}
// type={typeOfAlgo}
// />