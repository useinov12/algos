import React, { useState, useEffect, useReducer } from 'react'
import Chart from '../../Chart/Chart'


function TestComponent( {dispatchTest, testAction, testState} ){

    return (
        <div >
            Test Action: {testAction}
            <h3>Test Value:</h3>
            <div>
                Next: {testState.next}
                <div></div>
                Value: {testState.storage}
            </div>
            <button onClick={ ()=>dispatchTest({type:testAction}) }>run test</button>
        </div>
    )
}



function AlgoComp(props) {
    const {
        syncMode, 
        typeOfAlgo, 
        inputData, 
        runState } = props

    const [ isRunningLocal, setIsRunningLocal ] = useState(false)

    //Algo Section
        //Test
        const [ testAction, setTestAction] = useState(null)

        let initialTest = {
            storage:11,
            next:'stage1'
        }
        function reducerTest(state, action){
            switch(action.type){
                case 'init':
                    setTestAction(prev => prev = 'stage1')
                    return {...state, next:'stage1'}
                case 'stage1':
                    setTestAction(prev => prev = 'stage2')
                    return {...state, next:'stage2'}
                case 'stage2':
                    setTestAction(prev => prev = 'stage3')
                    return {...state, storage:state.storage+1, next:'stage3'}
                case 'stage3':
                    setTestAction(prev => prev = 'stage1')
                    return {...state, next:'stage1'}
            }
        }


    const [ testState, dispatchTest ] = useReducer( reducerTest, initialTest)

    useEffect(() => {
        dispatchTest({type:'init'})
    }, [])

    //Choose algo to run
        function runAlgo(action){
            switch(action){
                case 'Test': 
                    console.log('case found')
                    dispatchTest({type:testState.next})
                    return

            }
            
        }

    //Timeout, clearTimeout set up
        //if SyncMode
        useEffect(() => {
            if(runState === 'run'){
                return setIsRunningLocal(true)
            } 
            if(runState === 'pause'){
                return setIsRunningLocal(false)
            } 
        }, [runState])

        //if Single Algo run
        useEffect(() => {
            if(isRunningLocal){

                let id = window.setInterval(()=>{
                    // return ()=>runAlgo(typeOfAlgo)
                    // dispatchAlgo({type:typeOfAlgo})
                    runAlgo('Test')
                    
                }, inputData.speed )

                return () => window.clearInterval(id)
            }
        }, [isRunningLocal, testState])
 
        useEffect(() => {
            // console.log(testState.next, testState.storage)
        }, [testState])

    
    return (
        <div className="algo-compnent" style={{padding:'1rem'}}>
        
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
                            // ()=>runAlgo(typeOfAlgo)
                            ()=>runAlgo('Test')
                        }>
                        Next Move
                    </button>
                </div>
            </div>

            <TestComponent 
                dispatchTest={dispatchTest}
                testAction={testAction}
                testState={testState}
            />

            {/* <Chart 
                data={inputData.array} 
                type={typeOfAlgo}
                local={true}
            /> */}

            {/* <Chart 
                data={bubbleState.array} 
                comparingIdx={bubbleState.compareIdx}
                sorted={bubbleState.sorted}
                local={true}
                type={typeOfAlgo}
            /> */}

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



        
        //Bubble
/*         let initBubbleState = {
            isSorted:false,
            array:[],
            compareIdx:0,
            sorted:0,
            nextMove: '' //store next move here
        }
        function reducerBubble(state, action){
            switch(action.type){
                case 'init' :
                    //asign array here
                    return {  isSorted:false, array:[...inputData.array], compareIdx:0, sorted:0, nextMove: 'compare' }

                case 'compare' :
                    if( state.compareIdx === state.array.length && !state.isSorted )
                    return { ...state, compareIdx : 0, sorted:state.sorted+1,  nextMove:'compare' };

                    if( state.sorted === state.array.length )
                    return { ...state, nextMove : 'sorted', isSorted: true }; //exit

                    if (state.array[state.compareIdx] > state.array[state.compareIdx+1]) return { ...state, nextMove : 'swap' };
                    else  return { ...state, compareIdx:state.compareIdx+1, nextMove:'compare'};

                case 'swap' :
                    // console.log('swapping')

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
        useEffect(() => {
            dispatchNextMoveBubble( {type:'init'} )
        }, [ inputData ])
        useEffect(() => {
            // console.log(bubbleState.nextMove)
            // console.log(bubbleState)
        }, [ bubbleState ])
 */
