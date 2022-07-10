import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import  inputsReducer from './inputsSlice'
const reducer = combineReducers({
  // here we will be adding reducers
  inputsReducer,
})
const store = configureStore({
  reducer
})
export default store;






































// import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers } from 'redux'
// import  input  from './input'
// const reducer = combineReducers({
//   // here we will be adding reducers
//   input,
// })
// const store = configureStore({
//   reducer
// })
// export default store;