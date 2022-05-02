import React, { useState, useEffect, useReducer } from 'react'
import Inputs from './Inputs/Inputs'
import AlgoSection from './AlgoSection/AlgoSection'
import { Routes, Route, useLocation } from "react-router-dom";
import { createArray, createRandomArray } from '../../functions/functions'
import './main-section.css'



function MainSection(props) {
        const { 
            sortList, 
            searchList, 
            isRunningSync, 
            syncMode, 
            handleRemoveFromCompareList, 
            handleChangeCompareMode,
            compareList,
            compareMode
        } = props

    const list = [...sortList, ...searchList]
    const location = useLocation()


    //SyncInput states
        let initArr = createRandomArray()
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
                    let randomArr = createRandomArray()
                    return {...input, length : randomArr.length, array : randomArr}
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

    //Turn On CompareMode if page refreshed/or  visit strait to CompareMode page
    useEffect(()=>{
        if(location.pathname === '/compare-mode' &&  !compareMode) handleChangeCompareMode()
    }, [location])


    //Input switch animation
        const [contract, setContract ] = useState(false)
        const [collapseWidth, setCollapseWidth ] = useState(false)

        useEffect(()=>{
            let timer
            if(syncMode) timer = setTimeout(()=>setContract(false), 400)
            else  timer = setTimeout(()=>setContract(true), 5)
            return ()=> clearTimeout(timer)
            
        }, [syncMode])

        useEffect(()=>{
            let timer
            if(contract)timer = setTimeout(()=> setCollapseWidth(true), 200)
            else timer = setTimeout(()=> setCollapseWidth(false), 0)
            return ()=> clearTimeout(timer)
        },[contract])


    return (
        <div className={syncMode ? 'main-section sync-mode-on main-grid grid' : "main-section sync-mode-off main-grid grid"}>

            <div className={collapseWidth ? `collapse-container collapse-width` : `collapse-container`}>
                <div className={contract ? `collapse-section` : 'collapse-section expanded'  }>
                    <Inputs
                        syncMode={syncMode}
                        inputState={inputState}
                        dispatch={dispatchArray}
                        isRunningSync={isRunningSync}
                        className={'inputs-sync'}
                    />
                </div>
            </div>
            
            <div className={syncMode ? 'content-section sync-mode' : 'content-section individ-mode'}>
                <Routes>
                    <Route path="/compare-mode" exact element={
                        compareList.map( (algo, i) =>   
                            <AlgoSection
                                key={i}
                                typeOfAlgo={algo}
                                syncMode={syncMode}
                                inputStateSync={inputState}
                                isRunningSync={isRunningSync}
                                compareList={compareList}
                                handleRemoveFromCompareList={handleRemoveFromCompareList}
                            />
                        )}
                    />

                    { list.map( (algo, i) => {
                            return (
                                <Route key={i} path={algo.path} exact element={
                                    <AlgoSection
                                        typeOfAlgo={algo.name}
                                        syncMode={null}
                                        inputStateSync={null}
                                        isRunningSync={null}
                                        compareList={compareList}
                                        handleRemoveFromCompareList={null}
                                    />
                                }/>
                            ) 
                        })
                    }
                </Routes>
            </div>
        </div>
    )
}

export default MainSection