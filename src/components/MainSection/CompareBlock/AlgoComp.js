import React, { useState, useEffect, useReducer } from 'react'
import Chart from '../../Chart/Chart'



function AlgoComp(props) {
    const {
        syncMode, 
        typeOfAlgo, 
        inputData, 
        runState } = props

    const [ isRunningLocal, setIsRunningLocal ] = useState(false)
    const [pointer, setPointer ] = useState(0)//update when algoObjects is changing

    //Algo Section
        //Bubble
        let initBubbleState = {  
            isSorted:false,
            array:[],
            compareIdx:0,
            sorted:0,
            nextMove: '' //store next move here
        }
        function reducerBubble(state, action){
            setPointer(p => p+1) //update pointer to trigger state update in UseEffect
            switch(action.type){
                case 'init' :
                    return {  isSorted:false, array:[...inputData.array], compareIdx:0, sorted:0, nextMove: 'compare' }

                case 'compare' :
                    if( state.compareIdx === state.array.length && !state.isSorted )
                    return { ...state, compareIdx : 0, sorted:state.sorted+1,  nextMove:'compare' };

                    if( state.sorted === state.array.length )
                    return { ...state, nextMove : 'sorted', isSorted: true }; //exit

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
                    swap(state.array, state.compareIdx)
                    return { ...state, array : [...arrHolder], compareIdx : state.compareIdx+1,  nextMove:'compare'} ;

                case 'sorted' :
                    //clear local intervals here if any ?
                    return state
            }
        }
        const [ bubbleState, dispatchNextMoveBubble ] = useReducer( reducerBubble, initBubbleState )





    //Update on InputData Change
    useEffect(() => {   //ABCTRACT THAT COMMAND FOR ALL ALGOS
        setPointer(p => 0)
        switch(typeOfAlgo){
            case 'Bubble': 
            return dispatchNextMoveBubble( {type:'init'} )
        }
    }, [ inputData ])

    //Timeout, clearTimeout set up
        useEffect(() => {
            if(runState === 'run')return setIsRunningLocal(true)
            if(runState === 'pause')return setIsRunningLocal(false)
        }, [runState])

        //If Single Algo run
        useEffect(() => {
            if(isRunningLocal){
                let id = window.setInterval(()=>{
                    runAlgo(typeOfAlgo)
                }, inputData.speed )
                return () => window.clearInterval(id)
            }
        }, [isRunningLocal, pointer]) //pointer is abstraction for algoObjects
 
    //Choose algo to run
        function runAlgo(action){
            switch(action){
                case 'Bubble' : return dispatchNextMoveBubble({type:bubbleState.nextMove});
            }
        }

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

            <Chart                       /* ABSTRACT DATA FOR CHARTS */
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
