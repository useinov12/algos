import { createSlice, createAction } from '@reduxjs/toolkit'
import { createArray, createRandomArray } from '../functions/functions'


// localIpnuts: [...new Array(4)].map( ()=> ( {speed:45,length:100,array:createRandomArray()} ) )

const initialState = [{ id:1, speed:45,length:100,array:createRandomArray() }]
const reducer = {
    updateAllInput: (state, action) =>{
        return {...state, ...action.payload } 
    },
    updateSpeedInput: (state, action) =>{
        return {...state, speed:action.payload}
    },
    updateLengthInput: (state, action) =>{
        return {...state, length:action.payload}
    },
    updateArrayInput: (state, action) =>{
        const array = createArray(state.length)
        return {...state, array:array }
    },
    updateArrayRandomInput: (state, action) =>{
        const randomArr = createRandomArray()
        return {...state, length:randomArr.length, array:randomArr }
    }
}

// Slice
const slice = createSlice({
    name: 'input',
    initialState,
    reducers:{}
});


export default slice.reducer //exporting to ./store/index to combine reducers

// Actions
// export const { updateAllInput,  updateSpeedInput, updateLengthInput, updateArrayInput, updateArrayRandomInput } = slice.actions
export const { } = slice.actions