import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  store  from './store/index'
import { Provider } from 'react-redux'
import input from './store/input';

console.log(store) 
console.log(store.getState()) 
console.log(store.getState(input)) 



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
