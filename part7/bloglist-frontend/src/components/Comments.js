import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const Comments = ({ comments, id }) => {
  const dispatch = useDispatch()
  const commentHandler =async(event) => {
    event.preventDefault()
    console.log('try to comment 11')
    const comment= event.target.comment.value
    console.log(`111${comment}`)
    console.log('try to comment')
    await dispatch(addComment({ id, comment }))
  }
  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={commentHandler}>
        <input type ='text' name = 'comment' />
        <button >add comment</button>
      </form>
      <ul> {comments.map(comment => (<li key = {id}> { comment } </li>))}</ul>

    </div>
  )
}


export default Comments