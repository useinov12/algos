import React, { useState, useEffect, useReducer } from 'react'
import Inputs from './Inputs/Inputs'
import AlgoSection from './AlgoSection/AlgoSection'
import { Routes, Route } from "react-router-dom";
import useDelayUnmount from '../CustomHooks/useDelayUnmount'
import './main-section.css'


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


function MainSection(props) {
        const { 
            sortList, 
            searchList, 
            isRunningSync, 
            syncMode, 
            compareMode, 
            handleRemoveFromCompareList, 
            compareList
        } = props

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



        const [contract, setContract ] = useState(false)
        const [collapseWidth, setCollapseWidth ] = useState(false)

        useEffect(()=>{
            let timer
            if(syncMode) timer = setTimeout(()=>setContract(false), 200)
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
                    {<Inputs
                        syncMode={syncMode}
                        inputState={inputState}
                        dispatch={dispatchArray}
                        isRunningSync={isRunningSync}
                        className={'inputs-sync'}
                    />}
                </div>
            </div>
            
            

            
              
            <div className={syncMode ? 'content-section sync-mode' : 'content-section individ-mode'}>
                <Routes>
                    <Route path="/compare-mode" exact element={
                        compareList.map((algo, i) =>
                            <AlgoSection
                                key={i}
                                typeOfAlgo={algo}
                                syncMode={syncMode}
                                compareMode={compareMode}
                                inputStateSync={inputState}
                                isRunningSync={isRunningSync}
                                compareList={compareList}
                                handleRemoveFromCompareList={handleRemoveFromCompareList}
                            >
                            </AlgoSection>
                        )
                    }/>
                    { 
                        [...sortList, ...searchList].map( (algo, i)=> {
                            return <Route key={i} path={algo.path} exact element={
                                    <AlgoSection
                                        typeOfAlgo={algo.name}
                                        syncMode={null}
                                        compareMode={compareMode}
                                        inputStateSync={null}
                                        isRunningSync={null}
                                        compareList={compareList}
                                        handleRemoveFromCompareList={null}
                                    />
                                }
                            />
                        })
                    }
                </Routes>
            </div>
        </div>
    )
}

export default MainSection