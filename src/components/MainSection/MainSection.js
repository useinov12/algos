import React, { useState, useEffect, useReducer } from 'react'
import Inputs from './Inputs/Inputs'
import AlgoSection from './AlgoSection/AlgoSection'
import './main-section.css'
import {
    Routes,
    Route,
    NavLink
} from "react-router-dom";


const randomizer = (n) => Math.floor(Math.random()*n)
const randomizeArray = (array) =>{
    let n = array.length
    let t; let i;
    while(n){
        i = Math.floor(Math.random()* n--);
        t = array[n]
        array[n] = array[i]
        array[i] = t
    }
    return array
}
const createArray = (length) => {
    let array = []
    for(let i=0; i<length; i++){
        array.push(i)
    }
    randomizeArray(array)
    return array
}



function MainSection({handleChangeMode, compareMode, handleAddToCompareList, handleRemoveFromCompareList, compareList}) {
    //SyncMode switch
        const [ syncMode, setSyncMode ] = useState(false)
        const handleSyncModeChange = () => setSyncMode(prev => !prev)
        

    //SyncInput states
        let initArr = createArray(20)
        let InitSyncInputState = {
            speed:5,
            length:20,
            array:[...initArr]
        }
        function  reducerInputSync(input, action){
            switch (action.type){
                case 'update':  return { ...input, ...action.playload }
                case 'changeSpeed': return {...input, speed : action.playload}
                case 'changeLength': return {...input, length : action.playload}
                
                case 'changeArray':
                    let array = createArray(input.length)
                    return { ...input,  array : array }
                case 'changeArrayRandom':
                    let randomLength =  randomizer(100)
                    let randomArr = createArray(randomLength)
                    return {...input, length : randomLength, array : randomArr}
                default : console.log('Throw Error from reducerInputSync')
            }
        }
        const [ inputState, dispatchArray ] = useReducer(reducerInputSync, InitSyncInputState)
        //Reset SyncArray if SyncMode is on
        useEffect(() => {
            if(syncMode)return dispatchArray({type:'changeArray'});
        }, [syncMode])


    //isRunningSync State
        const [isRunningSync, setIsRunningSync ] = useState('initial')

        useEffect(() => {
            if(isRunningSync === 'reset') return dispatchArray( {type:'changeArray'} );
        }, [isRunningSync])


    //Buttons disable handlers
        const handleDisableCompareBtn = () => {
            if(isRunningSync === 'run' ) return true;
            if(isRunningSync === 'pause' ) return true;
            else return false;
        }
        const handleDisableSyncBtn = () =>{
            if(!compareMode) return true;
            if(isRunningSync === 'run' ) return true;
            if(isRunningSync === 'pause' ) return true;
            else return false;
        }
        const handleDisableRunSyncBtn = () =>{
            if(!syncMode || !compareMode) return true;
            if(isRunningSync === 'run' ) return true;
            else return false;
        }
        const handleDisablePauseBtn = () =>{
            if(!syncMode || !compareMode) return true;
            if(isRunningSync !== 'run') return true;
            else return false;
        }
        const handleDisableResetBtn = () =>{
            if(!syncMode || !compareMode) return true;
            if(isRunningSync !== 'pause') return true;
            else return false;
        }

    useEffect(() => {
        if(!compareMode)setSyncMode(false)
    }, [compareMode])


    return (
        <div className="content-section content-grid grid" style={syncMode ? {display:'flex'} : {display:'unset'}}>
            <div className='sync-menu'>
                <span>Compare Mode</span> 
                <NavLink to={compareMode ? "/bubblesort" : "/compare-mode"}>
                    <button 
                        disabled={handleDisableCompareBtn()} 
                        onClick={()=>handleChangeMode()}>
                        {compareMode ? 'on' : 'off'}
                    </button>
                </NavLink>

                <span>SYNC Mode</span>
                <button 
                    disabled={handleDisableSyncBtn()} 
                    onClick={()=>handleSyncModeChange()}>
                    {syncMode ? 'on' : 'off'}
                </button>
                
                {
                    syncMode && 
                    (<>
                        <Inputs
                            syncMode={syncMode}
                            inputState={inputState}
                            dispatch={dispatchArray}
                            isRunningSync={isRunningSync}
                            className={'inputs-container'}
                        />
                    
                        <div>
                            <button
                                disabled={handleDisableRunSyncBtn()} 
                                onClick={()=>{
                                    if(compareList.length===0) return prompt(' Add Algo before compare ');
                                    else setIsRunningSync('run');
                                }}>
                                {isRunningSync === 'pause' ? 'CONTINUE' : 'RUN SYNC'}
                            </button> 
                            <button
                                disabled={handleDisablePauseBtn()}
                                onClick={()=>setIsRunningSync('pause')}>
                                PAUSE
                            </button> 
                            <button
                                disabled={handleDisableResetBtn()}
                                onClick={()=>setIsRunningSync('reset')}>
                                RESET
                            </button> 
                        </div>
                    </>)
                }
                
            </div>
            

            {/* ALL ROUTES */}
            <div>
                <Routes>
                    <Route path="/compare-mode" exact element={
                        compareList.map((algo, i) =>
                            <AlgoSection
                                key={i}
                                typeOfAlgo={algo}
                                syncMode={syncMode}
                                inputStateSync={inputState}
                                isRunningSync={isRunningSync}
                                compareList={compareList}
                                handleRemoveFromCompareList={handleRemoveFromCompareList}
                            >
                            </AlgoSection>
                        )
                    }/>
                    <Route path="/bubble-sort" exact element={
                        <AlgoSection
                            typeOfAlgo={'Bubble'}
                            syncMode={null}
                            inputStateSync={null}
                            isRunningSync={null}
                            compareList={compareList}
                            handleRemoveFromCompareList={null}
                        />
                    }/>
                    <Route path="/quick-sort" exact element={
                        <AlgoSection
                            typeOfAlgo={'Quick'}
                            syncMode={null}
                            inputStateSync={null}
                            isRunningSync={null}
                            compareList={compareList}
                            handleRemoveFromCompareList={null}
                        />
                    }/>
                    <Route path="/merge-sort" exact element={
                        <AlgoSection
                            typeOfAlgo={'Merge'}
                            syncMode={null}
                            inputStateSync={null}
                            isRunningSync={null}
                            compareList={compareList}
                            handleRemoveFromCompareList={null}
                        />
                    }/>
                    <Route path="/selection-sort" exact element={
                        <AlgoSection
                            typeOfAlgo={'Selection'}
                            syncMode={null}
                            inputStateSync={null}
                            isRunningSync={null}
                            compareList={compareList}
                            handleRemoveFromCompareList={null}
                        />
                    }/>
                </Routes>
            </div>
        </div>
    )
}

export default MainSection

/* <Route path="/bubblesort" exact element={
    
/>
<Route path="/quicksort" exact element={
    <QuickSort array={array} handleChangeArray={handleChangeArray} length={length} />}
/>
<Route path="/mergesort" exact element={
    <MergeSort array={array} handleChangeArray={handleChangeArray} length={length} />}
/>
<Route path="/selectionsort" exact element={
    <SelectionSort array={array} handleChangeArray={handleChangeArray} length={length} />}
/>
 */