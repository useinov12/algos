import React from 'react'
import Chart from '../../Chart/Chart'


function AlgoComp( props) {
    const {  algoState, compareMode, typeOfAlgo, inputData, children} = props

    return (
        <div className={ compareMode ? 'algo-comp compare' : 'algo-comp single'}>

            <div className='local-algo-menu'>
                { children  }
            </div>

            <div className='chart-container'>
                <Chart
                    inputSpeed={inputData.speed}                       
                    data={algoState.array}
                    pivots={algoState.pivots}
                    isSorted = {algoState.isSorted}
                    local={true}
                    type={typeOfAlgo}
                /> 
            </div>
        </div>
    )
}

export default AlgoComp