
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecReducer, { initialAnecdotes } from './reducers/anecdoteReducer'
import notiReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'


const reducer = combineReducers({
    anec: anecReducer,
    noti: notiReducer,
    filter:filterReducer
})


const store = createStore(
    reducer,
    composeWithDevTools()
    )

anecdoteService.getAll().then(anecs =>
    store.dispatch(initialAnecdotes(anecs))
    )

export default store