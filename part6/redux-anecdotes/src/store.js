
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecReducer from './reducers/anecdoteReducer'
import notiReducer from './reducers/notificationReducer'


const reducer = combineReducers({
    anec: anecReducer,
    noti: notiReducer
})


const store = createStore(
    reducer,
    composeWithDevTools()
    )

export default store