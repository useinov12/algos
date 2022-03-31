import React, { useState, useEffect } from 'react'
import Chart from '../Chart/Chart'
import PropTypes from 'prop-types'

import './algo.css'

const delay2 = async ( t ) => {
    await new Promise((resolve)=>setTimeout(resolve, t))
}
const delay = (t) => new Promise((resolve)=>setTimeout(resolve, t))



export default function BubbleSort({array, handleChangeArray, length, speed}) {
    const [swaps, setSwaps ] = useState(0)
    const [comparingIdx, setComparingIdx] = useState(0)
    const [sorted, setSorted ] = useState(0)
    

    const globalB = async (arr, t) =>{
        const swap = (array, idx) => {
            let holder = array[idx]
            array[idx] = array[idx+1]
            array[idx+1] = holder
            setSwaps(prev => prev+=1)
        }
        const delay = async ( t ) => await new Promise((resolve)=>setTimeout(resolve, t))

        for(let i = 0; i<arr.length-1; i++){
            setComparingIdx(0)
            await delay(t)
            setSorted(i)
            await delay(t)
            for(let j = 0; j<arr.length-i; j++){
                let left =  j
                let right = j+1
                setComparingIdx(left)
                if(arr[j]>arr[j+1]){
                    await delay(t).then(()=>swap(arr, j))
                    handleChangeArray(arr)
                }
                await delay(t)
            }
        }
        console.log('Final: ', arr)
    }

    return (
        <div className="algo-content">
            BubbleSort
            <div>Number of swaps:{swaps}</div>
            <button id="sort" onClick={()=>globalB(array, speed)}>
                SORT!
            </button>
            <button id="sort" disabled={true} onClick={()=>{}}>
                STOP
            </button>
            <div>
                <Chart 
                    data={array} 
                    comparingIdx={comparingIdx}
                    sorted={sorted} 
                />
            </div>
        </div>
    )
}

BubbleSort.propTypes={
    array:PropTypes.array,
    handleChangeArray:PropTypes.func,
    length:PropTypes.number
}