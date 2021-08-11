import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

describe('Blog part', () => {
  let component

  const addLikes = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'testing the frontend',
      author:'Sarah',
      url:'www.baidu.com',
      likes:12
    }

    component = render(
      <Blog blog = {blog} addLikes={() => addLikes(blog)}/>
    )

  })

  test('render content', () => {
    expect(component.container).toHaveTextContent('testing the frontend')
    expect(component.container).toHaveTextContent('Sarah')

    const div = component.container.querySelector('.defaultDisplay')
    console.log(prettyDOM(div))
    expect(div).not.toHaveTextContent(
      'www.baidu.com'
    )
    expect(div).not.toHaveTextContent(
      '12'
    )
  })

  test('content after click', () => {
    const button = component.container.querySelector('.show')
    fireEvent.click(button)

    let div

    div = component.container.querySelector('.clickToShow')
    expect(div).toHaveStyle('display: block')

    const closeButton = component.container.querySelector('.close')
    fireEvent.click(closeButton)
    div =component.container.querySelector('.clickToShow')
    expect(div).toHaveStyle('display: none')
  })

  test('like button', () => {
    const button = component.container.querySelector('.like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(addLikes.mock.calls).toHaveLength(2)


  })
})