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


    const [arr, setArr ] = useState(array)
    const [i, setI ] = useState(0)
    const [j, setJ ] = useState(0)

    const swap = (arr, i) => {
        let holder = arr[i]
        arr[i] = arr[i+1]
        arr[i+1] = holder
        setSwaps(prev => prev+=1)
        setArr(arr)
    }
    let delay = async ( t ) => await new Promise((resolve)=>setTimeout(resolve, t))
    

    useEffect(() => {
        console.log('mounted')
        if(i>=arr.length) return;
        setSorted(i)
        return () => {
            console.log('unmounted')
        }
    }, [])


    useEffect(() => {
        if(j>=arr.length-1-i){
            setArr(arr)
            setI(prev => prev+1)
            setJ(0)
        }
        if(arr[j]>arr[j+1]){
            swap(arr, j)
        } 
        setArr(arr)
        setI(i)
        setJ(prev => prev+1)
        // setComparingIdx(j)
        return () => {
            
        }
    }, [i, arr])


    return (
        <div className="algo-content">
            BubbleSort
            <div>Number of swaps:{swaps}</div>
            <button id="sort" onClick={()=>true}>
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