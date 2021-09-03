import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={commentHandler}>
        <Form.Control type ='text' name = 'comment' />
        <Button type='submit'>add comment</Button>
      </Form>
      <ul> {comments.map(comment => (<li key = {id}> { comment } </li>))}</ul>

    </div>
  )
}


export default Comments