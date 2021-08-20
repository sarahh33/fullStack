import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'

import noteReducer, {initializeNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'
import noteService  from './services/notes'

//counter part
// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     case 'ZERO':
//       return 0
//     default:
//       return state
//   }
// }
// const store = createStore(counterReducer)

const reducer = combineReducers({
  notes:noteReducer,
  filter:filterReducer
})

const store = createStore(
  reducer,
   composeWithDevTools()
  )
console.log(store.getState())

noteService.getAll().then(notes =>
  notes.forEach(note => {
    store.dispatch({ type: 'NEW_NOTE', data: note })
  })
)

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  
  document.getElementById('root')
)

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

