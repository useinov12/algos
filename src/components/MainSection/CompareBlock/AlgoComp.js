import React, { useState, useEffect, useReducer } from 'react'
import Chart from '../../Chart/Chart'

function bubbleSort(state){
    const { compareIdx, array, isSorted, sorted } = state

    switch(state.nextMove){
        case 'compare' :
            if( compareIdx === array.length && !isSorted )
            return { ...state, compareIdx : 0, sorted:sorted+1,  nextMove:'compare' };

            if( sorted === array.length )
            return { ...state, nextMove : 'sorted', isSorted: true }; //exit condition

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


function AlgoComp( {syncMode, typeOfAlgo, inputData, runState} ) {
    const [ isRunningLocal, setIsRunningLocal ] = useState(false)

    //Algo Section
        function reducerAlgo(state, action){
            //Formating Data for choosen Algorithm
            if(action.type.command === 'format'){
                switch(action.type.algo){
                    case 'Bubble' :
                    return {  isSorted:false, array:[...inputData.array], compareIdx:0, sorted:0, nextMove: 'compare' }
                }
            } 
            else 
            //Running choosen Algorithm
            if(action.type.command === 'run'){
                switch(action.type.algo){
                    case 'Bubble': return   bubbleSort(state)
                }
            }
        }
        const [ algoState, dispatchAlgo ] = useReducer(reducerAlgo, {array:[], compareIdx:0, sorted:0})


    //Update/format data on InputData Change according to algo format
        useEffect(() => {  
            dispatchAlgo({type:{algo:typeOfAlgo, command:'format'}})
        }, [  ])
        
        useEffect(() => {  
            dispatchAlgo({type:{algo:typeOfAlgo, command:'format'}})
        }, [ inputData ])

    //Sync state switches localRunning state
        useEffect(() => {
            if(runState === 'run')return setIsRunningLocal(true)
            if(runState === 'pause')return setIsRunningLocal(false)
        }, [runState])
        //turn of running algo if switched from local to sync
        useEffect(() => {
            if(syncMode)return setIsRunningLocal(false) 
        }, [syncMode])

        //Algo running locally with Interval
        useEffect(() => {
            if(isRunningLocal){
                let id = window.setInterval( ()=>
                dispatchAlgo( {type:{algo:typeOfAlgo, command:'run'}}), inputData.speed )
                return () => window.clearInterval(id)
            }
        }, [isRunningLocal, algoState]) //re-run when (isRunningLocal === true) && algoState is changing
 

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
                    disabled={isRunningLocal}
                    onClick={
                        ()=>dispatchAlgo({type: {algo:typeOfAlgo, command:'run'} })
                    }>
                    Next Move
                </button>
                
            </div>

            <Chart                       
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




// import React, { useState, useEffect, useReducer } from 'react'
// import Chart from '../../Chart/Chart'

// function AlgoComp({syncMode, typeOfAlgo, inputData, runState}) {
//     const [ isRunningLocal, setIsRunningLocal ] = useState(false)
//     const [pointer, setPointer ] = useState(0)  //Update when algoObjectsState is changing


//     //Algo Section
//         //Bubble
//         let initBubbleState = {  
//             isSorted:false,
//             array:[],
//             compareIdx:0,
//             sorted:0,
//             nextMove: '' //store next move here
//         }
//         function reducerBubble(state, action){
//             const {compareIdx, array, isSorted, sorted} = state
//             setPointer(p => p+1) //update pointer to trigger state update in UseEffect
//             switch(action.type){
//                 case 'init' :
//                     return {  isSorted:false, array:[...inputData.array], compareIdx:0, sorted:0, nextMove: 'compare' }
//                 case 'compare' :
//                     if( compareIdx === array.length && !isSorted )
//                     return { ...state, compareIdx : 0, sorted:sorted+1,  nextMove:'compare' };

//                     if( sorted === array.length )
//                     return { ...state, nextMove : 'sorted', isSorted: true }; //exit

//                     if (array[compareIdx] > array[compareIdx+1]) return { ...state, nextMove : 'swap' };
//                     else  return { ...state, compareIdx:compareIdx+1, nextMove:'compare'};
//                 case 'swap' :
//                     let arrHolder = []
//                     const swap = (arr, i) => {
//                         let arrHolderInner = [...arr]
//                         let holder = arrHolderInner[i]
//                         arrHolderInner[i] = arrHolderInner[i+1]
//                         arrHolderInner[i+1] = holder 
//                         arrHolder = [...arrHolderInner]
//                     }
//                     swap(array, compareIdx)
//                     return { ...state, array : [...arrHolder], compareIdx : compareIdx+1,  nextMove:'compare'} ;
                    
//                 case 'sorted': return state;
//             }
//         }
//         const [ bubbleState, dispatchNextMoveBubble ] = useReducer( reducerBubble, initBubbleState )



//     //Update on InputData Change
//         useEffect(() => {   //ABCTRACT THAT COMMAND FOR ALL ALGOSß
//             setPointer(p => 0)
//             switch(typeOfAlgo){
//                 case 'Bubble': return dispatchNextMoveBubble( {type:'init'} )
//             }
//         }, [ inputData ])

//     //Timeout, clearTimeout set up
//         useEffect(() => {
//             if(runState === 'run')return setIsRunningLocal(true)
//             if(runState === 'pause')return setIsRunningLocal(false)
//         }, [runState])
//         useEffect(() => {
//             if(syncMode)return setIsRunningLocal(false) //turn of running algo if switched from local to sync
//         }, [syncMode])

//         //If Single Algo run
//         useEffect(() => {
//             if(isRunningLocal){
//                 let id = window.setInterval( ()=>runAlgo(typeOfAlgo), inputData.speed )
//                 return () => window.clearInterval(id)
//             }
//         }, [isRunningLocal, pointer]) //pointer is abstraction for algoObjects
 
//     //Choose algo to run
//         function runAlgo(action){
//             switch(action){
//                 case 'Bubble' : return dispatchNextMoveBubble({type:bubbleState.nextMove});
//             }
//         }

//     return (
//         <div className="algo-compnent" style={{padding:'1rem'}}>
        
//             <div className="compare-mode-algo-info">
//                 <div>Some stats: ...</div>
//                 <div>Complexity: O(n)</div>
//                 <div className="compare-mode-algo-btn-container">
//                     <button id="sort"
//                         disabled={syncMode ? true : false} 
//                         onClick={
//                             ()=>setIsRunningLocal(true)
//                         }> SORT!
//                     </button>
//                     <button id="stop" 
//                         disabled={syncMode ? true : false} 
//                         onClick={
//                             ()=>setIsRunningLocal(false)
//                         }> STOP
//                     </button>
//                 </div>

//                 <button 
//                     // disabled={}
//                     onClick={
//                         ()=>runAlgo(typeOfAlgo)
//                     }>
//                     Next Move
//                 </button>
                
//             </div>

//             <Chart                       /* ABSTRACT DATA FOR CHARTS,  mb make Pointer an object*/
//                 data={bubbleState.array} 
//                 comparingIdx={bubbleState.compareIdx}
//                 sorted={bubbleState.sorted}
//                 local={true}
//                 type={typeOfAlgo}
//             />
//         </div>
//     )

// }

// export default AlgoComp
