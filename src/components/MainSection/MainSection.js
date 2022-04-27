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



function MainSection({isRunningSync, syncMode, compareMode, handleSyncModeChange, handleRemoveFromCompareList, compareList}) {
        

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
        //Reset SyncArray if SyncMode is On
        useEffect(() => {
            if(syncMode)return dispatchArray({type:'changeArray'});
        }, [syncMode])

        //Reset SyncArray if Reset clicked
        useEffect(() => {
            if(isRunningSync === 'reset') return dispatchArray( {type:'changeArray'} );
        }, [isRunningSync])

        // style={syncMode ? {display:'flex'}: {display:'unset'}}
    return (
        <div className={syncMode ? 'main-section-sync-mode-on main-grid grid' : "main-section-sync-mode-off main-grid grid"}  >

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
                </>)
            }
            

            {/* ALL ROUTES */}
            <div className='content-section'>
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
