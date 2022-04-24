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



function AlgoCompTest(props) {
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
        </div>
    )

}

export default AlgoCompTest