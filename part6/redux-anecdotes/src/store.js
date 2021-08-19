
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecReducer from './reducers/anecdoteReducer'
import notiReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'


const reducer = combineReducers({
    anec: anecReducer,
    noti: notiReducer,
    filter:filterReducer
})


const store = createStore(
    reducer,
    composeWithDevTools()
    )

export default store