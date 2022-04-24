import React, { useState, useEffect, useReducer } from 'react'
import Chart from '../../Chart/Chart'

const swap = (arr, i, j) => {
    let holder = arr[i]
    arr[i] = arr[j]
    arr[j] = holder 
    return [...arr]
}

function bubbleSort(state){
    const {array, isSorted, pivots, nextMove } = state
    const { compareIdx, sorted } = pivots

    //Functionality
    const bubbleSwap = (arr, i, j) =>{
        let arrHolder = [...arr]
        swap(arrHolder, i, j)
        return { ...state, array : arrHolder, pivots:{compareIdx : compareIdx+1, sorted:sorted},  nextMove:'compare'}; 
    }
    const bubbleCompare = ()=>{
        if( sorted === array.length )
            return { ...state, nextMove : 'sorted', isSorted: true }; //exit condition

        if (array[compareIdx] > array[compareIdx+1]) 
            return { ...state, nextMove : 'swap' };

        if(compareIdx === array.length) 
            return { ...state, pivots:{compareIdx : 0, sorted:sorted+1},  nextMove:'compare' };
        else  
            return { ...state, pivots:{compareIdx : compareIdx+1, sorted:sorted}, nextMove:'compare'};
    }

    switch(nextMove){
        case 'compare' : return bubbleCompare()
        case 'swap' : return bubbleSwap(array, compareIdx, compareIdx+1);
        case 'sorted': return state;
    }
}

function quickSort(state){
    let { array, isSorted, pivots, listOfSubArrays, nextMove } = state
    let { leftIdx, rightIdx, pivotIdx } = pivots
    // console.log(array[pivotIdx])
    const swap = (arr, i, j) => {
        let holder = arr[i]
        arr[i] = arr[j]
        arr[j] = holder 
        return arr
    }
    
    // console.log(listOfSubArrays)
    switch(nextMove){
        
        case 'checkCollection': //1
            // console.log('been in checkCollection')
            // console.log(listOfSubArrays)
            //exit condition
            if(!listOfSubArrays[0])return {...state, isSorted:true, nextMove:'sorted' } 
            else {
                let prevRange = listOfSubArrays.pop()
                console.log(prevRange, pivotIdx)
                let leftEdge = prevRange[0]
                let rightEdge = prevRange[1]

                if(pivotIdx<=leftEdge){ //change this condition 
                    if(pivotIdx>=rightEdge) return {...state, listOfSubArrays:listOfSubArrays, nextMove:'checkCollection'};
                    else {
                        if(rightEdge-leftEdge>1)listOfSubArrays.push([pivotIdx, rightEdge]);
                        return {...state, 
                            pivots:{leftIdx:pivotIdx, pivotIdx:Math.floor((rightEdge+pivotIdx)/2), rightIdx:rightEdge}, 
                            listOfSubArrays:listOfSubArrays,
                            nextMove:'sort'
                        }
                    }
                    
                } 
                else {
                    if(pivotIdx>=rightEdge){
                        listOfSubArrays.push([leftEdge, pivotIdx])
                        return {...state, 
                            pivots:{ leftIdx:leftEdge, pivotIdx:Math.floor((leftEdge+pivotIdx)/2), rightIdx:pivotIdx}, 
                            listOfSubArrays:listOfSubArrays,
                            nextMove:'sort'};
                    }
                    else {
                        listOfSubArrays.push([leftEdge, pivotIdx])
                        // listOfSubArrays.push([pivotIdx, rightEdge])
                        if(rightEdge-leftEdge>1)listOfSubArrays.push([pivotIdx, rightEdge]);
                        return {...state, 
                            pivots:{ leftIdx:leftEdge, pivotIdx:Math.floor((leftEdge+pivotIdx/2)), rightIdx:pivotIdx}, 
                            listOfSubArrays:listOfSubArrays,
                            nextMove:'sort'}; 
                    }
                }
            } 
    
        case 'sort': 
            // console.log('been in SORT')
            // exit condition
            if(leftIdx>=rightIdx) return {...state, nextMove:'pivotSwap'}; //Final swap -  Pivot  
            else
            //swap
            if( array[leftIdx]>array[pivotIdx] && array[pivotIdx]>array[rightIdx]) 
                return {...state, nextMove:'swap'};
            else 
            //leftIdx++
            if(array[leftIdx]<=array[pivotIdx] /* && leftIdx<=rightIdx */) 
                return {...state, pivots:{leftIdx:leftIdx+1, rightIdx:rightIdx, pivotIdx:pivotIdx}, nextMove:'sort'};
            else
            //rightIdx++
            if(array[rightIdx]>=array[pivotIdx] /* && rightIdx>=leftIdx */) 
                return {...state, pivots:{leftIdx:leftIdx, rightIdx:rightIdx-1, pivotIdx:pivotIdx}, nextMove:'sort'};
        
        case 'pivotSwap':
            let arrHolder = [...array] 
            console.log('SWAPIN PIVOT')
            if(rightIdx>pivotIdx && array[pivotIdx]>array[rightIdx]){
                swap(arrHolder, pivotIdx, rightIdx )
                return { ...state, array:[...arrHolder], pivots:{leftIdx:leftIdx, pivotIdx:rightIdx, rightIdx:rightIdx}, nextMove:'checkCollection' };
            }
            else if(leftIdx<pivotIdx && array[pivotIdx]<array[leftIdx]){
                swap(arrHolder, leftIdx, pivotIdx )
                return { ...state, array:[...arrHolder], pivots:{leftIdx:leftIdx, pivotIdx:leftIdx, rightIdx:rightIdx}, nextMove:'checkCollection' };
            }
            else return { ...state, nextMove:'checkCollection' };

        case 'swap': 
            // console.log('EVEN SWAPED')
            let arrCopy = [...array] 
            swap(arrCopy, leftIdx, rightIdx )
            return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:pivotIdx, rightIdx:rightIdx-1}, nextMove:'sort' };
            
        case 'sorted': {
            console.log('DONE', listOfSubArrays)
            return state;
        }
    }
}

function AlgoComp( {syncMode, typeOfAlgo, inputData, isRunningSync} ) {
    const [ isRunningLocal, setIsRunningLocal ] = useState(false)
    
    //Algo Section
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
                }
            } 
            else 
            //Running choosen Algorithm
            if(action.type.command === 'run'){
                switch(action.type.algo){
                    case 'Bubble': return   bubbleSort(state)
                    case 'Quick': return   quickSort(state)
                }
            }
        }
        const [ algoState, dispatchAlgo ] = useReducer(reducerAlgo, {isSorted:false, array:[], pivots:{}})


    //Update/format data on InputData Change according to algo format
        useEffect(() => {  
            console.log('on-mount Algo comp')
            dispatchAlgo({type:{algo:typeOfAlgo, command:'format'}})
        }, [  ])
        
        useEffect(() => {  
            dispatchAlgo({type:{algo:typeOfAlgo, command:'format'}})
        }, [ inputData ])

    //Sync state switches localRunning state
        useEffect(() => {
            if(isRunningSync === 'run')return setIsRunningLocal(true)
            if(isRunningSync === 'pause')return setIsRunningLocal(false)
        }, [isRunningSync])
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
                <div>Length: {inputData.array.length}</div>
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
                pivots={algoState.pivots}
                local={true}
                type={typeOfAlgo}
            />
        </div>
    )

}

export default AlgoComp
