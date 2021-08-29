import { createStore, combineReducers, applyMiddleware } from 'redux'
import notification from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogs from './reducers/blogsReducer'

const store = createStore(combineReducers({ notification, blogs }),
  composeWithDevTools(applyMiddleware(thunk)))

export default store