
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecReducer, { initialAnecdotes } from './reducers/anecdoteReducer'
import notiReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'



const reducer = combineReducers({
    anec: anecReducer,
    noti: notiReducer,
    filter:filterReducer
})


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
    )

export default store