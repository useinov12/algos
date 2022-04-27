import React, { useState, useEffect, useReducer } from 'react'
import Chart from '../../Chart/Chart'

const swap = (arr, i, j) => {
    let holder = arr[i]
    arr[i] = arr[j]
    arr[j] = holder 
    return arr
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
        else  return { ...state, pivots:{compareIdx : compareIdx+1, sorted:sorted}, nextMove:'compare'};
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
    
    switch(nextMove){
        case 'sorted': {
            console.log('DONE', listOfSubArrays)
            return {...state, nextMove:'eject'};
        }
        case 'eject':
            console.log('EJECT')
            return state
        case  'checkCollection': //1
            console.log('Checking Collection...')
            console.log('incoming collection: ', listOfSubArrays)
            console.log('incoming sorted range: ', listOfSubArrays[listOfSubArrays.length-1])
            console.log('incoming pivots: ', pivots)
            
            //exit condition
            if(!listOfSubArrays[0])return {...state, isSorted:true, nextMove:'sorted' };
            else {
                let copy = [...listOfSubArrays]
                let prevRange = copy.pop()
                let leftEdge = prevRange[0]
                let rightEdge = prevRange[1]
                let newPivots
                if(leftEdge>0 && pivotIdx<=5)newPivots = { leftIdx:leftEdge-1, rightIdx:leftIdx, pivotIdx: Math.floor((leftEdge+leftIdx)/2)};
                else newPivots = { leftIdx:leftEdge, rightIdx:leftIdx, pivotIdx: Math.floor((leftEdge+leftIdx)/2)};

                
                //check if need to go lower
                if(rightEdge-leftEdge <=2){
                    console.log('bottom condition hit, start eliminating subArrayList:', copy)
                    
                    return {...state, listOfSubArrays:copy, nextMove:'checkCollection'}
                } else {
                    let updatedList = [...copy]
                    console.log('Continuation settings...')
                    
                    //prepare next subArrays if any
                    if(rightEdge-rightIdx>2){
                        console.log('adding range on right side: ', [rightIdx, rightEdge])
                        if(rightEdge<array.length)updatedList = [ ...updatedList, [rightIdx, rightEdge+1]];
                        else updatedList = [...updatedList, [rightIdx, rightEdge]]
                    }
                    if(leftIdx-leftEdge>2){
                        console.log('adding range on left side: ', [leftEdge, leftIdx])
                        if(leftEdge>0 && pivotIdx<=5)updatedList = [...updatedList, [leftEdge-1, leftIdx]];
                        else updatedList = [...updatedList, [leftEdge, leftIdx]]; 
                    }
                    
                    if(updatedList[0]){
                        let nextRange = updatedList[updatedList.length-1]
                        if(nextRange[1]-nextRange[0]>2){
                            console.log('going to sort range:', updatedList[updatedList.length-1])
                            let updatedPivots = {leftIdx:nextRange[0], rightIdx:nextRange[1]-1, pivotIdx:Math.floor((nextRange[0]+nextRange[1])/2)}
                            console.log('Updated pivots')
                            console.log(updatedPivots)
                            return {...state, pivots:updatedPivots, listOfSubArrays:updatedList, nextMove:'sort'}
                        } 
                    }
                    else 
                    return {...state, pivots:newPivots, listOfSubArrays:updatedList, nextMove:'checkCollection'} 
                }
            } 

        case 'sort': 
            // exit condition
            if(leftIdx>rightIdx){
                console.log('Hit Sort exit condition')
                return {...state, nextMove:'checkCollection'}
            }
            //swap
            if(array[leftIdx]>=array[pivotIdx] && array[rightIdx]<=array[pivotIdx] )
                return {...state, nextMove:'swap'};
            //leftIdx++
            if(array[leftIdx]<=array[pivotIdx] ) 
                return {...state, pivots:{leftIdx:leftIdx+1, rightIdx:rightIdx, pivotIdx:pivotIdx}, nextMove:'sort'};
            //rightIdx++
            if(array[rightIdx]>=array[pivotIdx] ) 
                return {...state, pivots:{leftIdx:leftIdx, rightIdx:rightIdx-1, pivotIdx:pivotIdx}, nextMove:'sort'};

        case 'swap': 
            // console.log('EVEN SWAPED')
            let arrCopy = [...array] 
            if(leftIdx===pivotIdx || rightIdx === pivotIdx){
                if(leftIdx===pivotIdx){
                    swap(arrCopy, leftIdx, rightIdx )
                    return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:rightIdx, rightIdx:rightIdx-1}, nextMove:'sort' };
                }
                else
                if(rightIdx===pivotIdx){
                    swap(arrCopy, leftIdx, rightIdx )
                    return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:leftIdx, rightIdx:rightIdx-1}, nextMove:'sort' };
                }
            } 
            else {
                swap(arrCopy, leftIdx, rightIdx )
                return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:pivotIdx, rightIdx:rightIdx-1}, nextMove:'sort' };
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

        //Turn of running algo if switched from local to sync
        useEffect(() => {
            if(syncMode)return setIsRunningLocal(false) 
        }, [syncMode])

        //Algo running locally with Interval
        useEffect(() => {
            if(isRunningLocal){
                let id = window.setInterval( ()=>
                dispatchAlgo( {type:{algo:typeOfAlgo, command:'run'}}), inputData.speed )
                if(algoState.nextMove === 'eject')setIsRunningLocal(false)
                return () => window.clearInterval(id)
            }
        }, [isRunningLocal, algoState]) //re-run when (isRunningLocal === true) && watch when algoState is changing
 
    return (
        <div className="algo-compnent" style={{padding:'1rem'}}>

            <div className="local-buttons__algo-component">
                <button 
                    disabled={syncMode ? true : false} 
                    onClick={()=>setIsRunningLocal(true)}> 
                        sort
                </button>
                <button 
                    disabled={syncMode ? true : false} 
                    onClick={()=>setIsRunningLocal(false)}> 
                    stop
                </button>
                <button 
                    disabled={isRunningLocal}
                    onClick={()=>dispatchAlgo({type: {algo:typeOfAlgo, command:'run'} })}>
                    next
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