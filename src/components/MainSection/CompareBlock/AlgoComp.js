import React, { useState, useEffect, useReducer } from 'react'
import Chart from '../../Chart/Chart'

function AlgoComp(props) {
    const {
        syncMode, 
        typeOfAlgo, 
        inputData, 
        runState, 
        intervalState
    } = props

    //Algo Section
        //Bubble
        let initBubbleState = {
            isSorted:false,
            array:[],
            compareIdx:0,
            sorted:0,
            nextMove: 'check' 
        }
        function reducerBubble(state, action){
            switch(action.type){
                case 'init' :
                    //asign array here
                    return {...state, array:[...inputData.array]}
                case 'check' :
                    //if comparing function return false -> return isSorted:true
                    //if sorted === array.lengtn return isSorted:true
                    //else compare
                    return {...state, nextMove:'compare'}
                case 'compare' :
                    //if compare idx === state.array.length-state.sorted
                    //return {...state, compareIdx:0, sorted:state.sorted+1, nextMove:'compare'} 
                    //if left > right swap
                    return {...state, nextMove:'swap'}  
                    //else 
                    //return {...state, compareIdx:state.compareIdx+1, nextMove:'compare'}
                case 'swap' :
                    let arrHolder = []
                    //perform swap
                    return {...state, array:arrHolder, nextMove:'compare'}
                case 'pause' :
                    //clear intervals here
                    return {...state, nextMove: null}
                case 'continue' :
                    //clear intervals here
                    return {...state, nextMove: 'check'}
                case 'update' :
                    return 
            }
        }
        const [ bubbleState, dispatchNextMoveBubble ] = useReducer( reducerBubble, initBubbleState )
        //Initial assign
        useEffect(() => {
            dispatchNextMoveBubble({type:'init'})
        }, [])



    //Timeout, clearTimeout set up
        useEffect(() => {
            
            return () => {
                
            }
        }, [runState])

    
    //Choose algo to run
    function runAlgo(action, array, compareIdx, sorted, speed){
        switch(action){
            case 'Bubble' :
                //CHANGE TO reducerBubble HERE
                dispatchNextMoveBubble(array, compareIdx, sorted, speed)
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
            </div>

            <Chart 
                data={inputData.array} 
                type={typeOfAlgo}
                local={true}
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