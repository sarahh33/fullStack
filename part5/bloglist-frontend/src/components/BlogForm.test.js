import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and acalls onSubemit', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={addBlog}/>
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input,{
    target:{ value :'my test for BlogForm' }
  })
  fireEvent.submit(form)
  console.log(addBlog.mock.calls[0][0].title)
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('my test for BlogForm')
})