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
        case 'sorted': {
            console.log('DONE', listOfSubArrays)
            // console.log(array)
            return state;
        }
        case 'Fake case':
            console.log('In fake case', listOfSubArrays)
            return {...state, nextMove:'checkCollection'}

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
                        // updatedList.push([rightIdx, rightEdge])
                        if(rightEdge<array.length)updatedList = [ ...updatedList, [rightIdx, rightEdge+1]];
                        else updatedList = [...updatedList, [rightIdx, rightEdge]]
                    }
                    if(leftIdx-leftEdge>2){
                        console.log('adding range on left side: ', [leftEdge, leftIdx])
                        // updatedList.push([leftEdge, leftIdx])
                        if(leftEdge>0 && pivotIdx<=5)updatedList = [...updatedList, [leftEdge-1, leftIdx]];
                        else updatedList = [...updatedList, [leftEdge, leftIdx]]; 
                         
                        
                    }
                    
                    if(updatedList[0]){
                        let nextRange = updatedList[updatedList.length-1]
    
                        if(nextRange[1]-nextRange[0]>2){
                            console.log('going to sort range:', updatedList[updatedList.length-1])
                            let updatedPivots = {leftIdx:nextRange[0], rightIdx:nextRange[1]-1, pivotIdx:Math.floor((nextRange[0]+nextRange[1])/2)}
                            // console.log('Bottom reached')
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
            // console.log(nextMove)
            
            // exit condition
            if(leftIdx>rightIdx){
                console.log('Hit Sort exit condition')
                return {...state, nextMove:'checkCollection'}
            }
            else
            //swap
            if(array[leftIdx]>=array[pivotIdx] && array[rightIdx]<=array[pivotIdx] )
                return {...state, nextMove:'swap'};

            else
            //leftIdx++
            if(array[leftIdx]<=array[pivotIdx] ) 
                return {...state, pivots:{leftIdx:leftIdx+1, rightIdx:rightIdx, pivotIdx:pivotIdx}, nextMove:'sort'};
            else
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

        // useEffect(()=>{
        //     console.log(algoState.nextMove)
        // }, [algoState.nextMove])


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
                // console.log(algoState.nextMove)
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
                isSorted = {algoState.isSorted}
                local={true}
                type={typeOfAlgo}
            />
        </div>
    )

}

export default AlgoComp



// let prevRange = listOfSubArrays.pop()
// // let prevRange = listOfSubArrays.shift()
// // let prevRange = listOfSubArrays[listOfSubArrays.length-1]

// console.log(prevRange, pivotIdx)
// let leftEdge = prevRange[0]
// let rightEdge = prevRange[1]
// if(rightEdge-leftEdge<=1) return {...state, listOfSubArrays:listOfSubArrays, nextMove:'checkCollection'};
// //if at the bottom
// if(pivotIdx<=leftEdge){ //change this condition 
//     console.log('left hit')
//     if(pivotIdx>=rightEdge)return {...state, listOfSubArrays:listOfSubArrays, nextMove:'checkCollection'};
    
//     else {
//         // listOfSubArrays.push([leftEdge, pivotIdx])
//         if(rightEdge-leftEdge>=1)listOfSubArrays.push([pivotIdx, rightEdge]);
//         return {...state, 
//             pivots:{leftIdx:pivotIdx, pivotIdx:Math.floor((rightEdge+pivotIdx)/2), rightIdx:rightEdge}, 
//             listOfSubArrays:listOfSubArrays,
//             nextMove:'sort'
//         }
//     }
    
// } 
// //if not at the bottom yet
// else {
//     console.log('right hit')
//     if(pivotIdx>=rightEdge){
//         listOfSubArrays.push([leftEdge, pivotIdx])
//         return {...state, 
//             pivots:{ leftIdx:leftEdge, pivotIdx:Math.floor((leftEdge+pivotIdx)/2), rightIdx:pivotIdx}, 
//             listOfSubArrays:listOfSubArrays,
//             nextMove:'sort'};
//     }
//     else {
//         if(rightEdge-leftEdge>=1)listOfSubArrays.push([pivotIdx, rightEdge]);
//         listOfSubArrays.push([leftEdge, pivotIdx])
//         return {...state, 
//             pivots:{ leftIdx:leftEdge, pivotIdx:Math.floor((leftEdge+pivotIdx/2)), rightIdx:pivotIdx}, 
//             listOfSubArrays:listOfSubArrays,
//             nextMove:'sort'}; 
//     }
// }



            // // exit condition
            // if(leftIdx>=rightIdx) return {...state, nextMove:'pivotSwap'}; //Final swap -  Pivot  
            // else
            // //swap
            // if( array[leftIdx]>array[pivotIdx] && array[pivotIdx]>array[rightIdx]) 
            //     return {...state, nextMove:'swap'};
            // else 
            // //leftIdx++
            // if(array[leftIdx]<=array[pivotIdx] /* && leftIdx<=rightIdx */) 
            //     return {...state, pivots:{leftIdx:leftIdx+1, rightIdx:rightIdx, pivotIdx:pivotIdx}, nextMove:'sort'};
            // else
            // //rightIdx++
            // if(array[rightIdx]>=array[pivotIdx] /* && rightIdx>=leftIdx */) 
            //     return {...state, pivots:{leftIdx:leftIdx, rightIdx:rightIdx-1, pivotIdx:pivotIdx}, nextMove:'sort'};





            // case 'pivotSwap':
            //     let arrHolder = [...array] 
            //     console.log('SWAPIN PIVOT')
    
    
            //     if(rightIdx>pivotIdx && array[pivotIdx]>array[rightIdx]){
            //         swap(arrHolder, pivotIdx, rightIdx )
            //         let updatedPivots = {leftIdx:leftIdx, pivotIdx:rightIdx, rightIdx:rightIdx}
    
    
            //         return { ...state, array:[...arrHolder], pivots:updatedPivots, nextMove:'checkCollection' };
            //     }
    
    
            //     else if(leftIdx<pivotIdx && array[pivotIdx]<array[leftIdx]){
            //         swap(arrHolder, leftIdx, pivotIdx )
            //         let updatedPivots = {leftIdx:leftIdx, pivotIdx:leftIdx, rightIdx:rightIdx}
            //         // let updatedListOfSubArrays = [...listOfSubArrays, [leftIdx, pivotIdx]]
    
            //         return { ...state, array:[...arrHolder], pivots:updatedPivots, nextMove:'checkCollection' };
            //     }
    
                
            //     else return { ...state, nextMove:'checkCollection' };
    

            // case 'swap': 
            // // console.log('EVEN SWAPED')
            // let arrCopy = [...array] 
            // swap(arrCopy, leftIdx, rightIdx )
            // return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:pivotIdx, rightIdx:rightIdx-1}, nextMove:'sort' };




            // if(leftIdx>=pivotIdx){
            //     console.log('side-swap')
            //     if(leftIdx>=rightIdx){
            //         swap(arrCopy, leftIdx, rightIdx )
            //         return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:rightIdx, rightIdx:rightIdx-1}, nextMove:'checkCollection' };
            //     } 
            //     else 
            //     swap(arrCopy, leftIdx, rightIdx )
            //     return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:rightIdx, rightIdx:rightIdx-1}, nextMove:'sort' };
            // }
            // else
            // if(rightIdx <= pivotIdx){
            //     console.log('side-swap')
            //     if(leftIdx>=rightIdx){
            //         swap(arrCopy, leftIdx, rightIdx )
            //         return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:leftIdx, rightIdx:rightIdx-1}, nextMove:'checkCollection' };
            //     } 
            //     else
            //     swap(arrCopy, leftIdx, rightIdx )
            //     return { ...state, array:[...arrCopy], pivots:{leftIdx:leftIdx+1, pivotIdx:leftIdx, rightIdx:rightIdx-1}, nextMove:'sort' };
            // }
            // else 




                        // //exit condition
                        // if(!listOfSubArrays[0])return {...state, isSorted:true, nextMove:'sorted' };
                        // else {
                        //     let prevRange = listOfSubArrays.pop()
                        //     let leftEdge = prevRange[0]
                        //     let rightEdge = prevRange[1]
                        //     console.log(prevRange)
                        //     if(leftEdge <= leftIdx){    
                        //         console.log(true)
                        //         let updatedList = [...listOfSubArrays, [leftIdx, rightEdge]]
                        //         let newPivots = {leftIdx:leftEdge, rightIdx:leftIdx, pivotIdx: Math.floor((leftEdge+leftIdx)/2)}
                        //         console.log(updatedList)
                        //         console.log(newPivots)
                        //         return {...state, pivots:{leftIdx:leftEdge, rightIdx:leftIdx, pivotIdx: Math.floor((leftEdge+leftIdx)/2)}, listOfSubArrays:updatedList, nextMove:'sort'}
                        //     }
                        //     else return {...state,  nextMove:'checkCollection'}
                        // } 