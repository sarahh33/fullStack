import { createStore, combineReducers, applyMiddleware } from 'redux'
import notification from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogs from './reducers/blogsReducer'
import user from './reducers/userReducer'
import userList from './reducers/userListReducer'

const store = createStore(combineReducers({ notification, blogs, user, userList }),
  composeWithDevTools(applyMiddleware(thunk)))

export default store