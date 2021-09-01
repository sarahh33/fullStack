import blogService from '../services/blogs'
const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INITIAL':
    return action.data
  case 'ADD':
    return state.concat(action.data)
  case 'DELETE':
    console.log(`me me ${action.data}`)
    return state.filter((note => note._id !== action.data))
  case 'LIKE': {
    return state.map((note) => note.id !== action.data ? note : { ...note, likes: note.likes + 1 })
  }
  default:
    return state
  }
}

export const setBlogs = (blog) => {
  return async (dispatch) => {
    if (blog.length === 0) {
      const response = await blogService.getAll()
      dispatch({
        type: 'INITIAL',
        data: response
      })
      return
    }
    const response = await blogService.create(blog)
    dispatch({
      type: 'ADD',
      data: response
    })
  }
}

export const toDeleteBlog= (blog) => {
  return async (dispatch) => {
    await blogService.removeBlog( blog )
    dispatch({
      type: 'DELETE',
      data: blog._id
    })
    console.log('999')
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.putLikes({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      data: blog.id
    })
  }
}

export default blogsReducer