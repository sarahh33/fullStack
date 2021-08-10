import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

test('render content', () => {
  const blog = {
    title: 'testing the frontend',
    author:'Sarah',
    url:'www.baidu.com',
    likes:12
  }

  const component = render(
    <Blog blog = {blog} />
  )


  expect(component.container).toHaveTextContent('testing the frontend')
  expect(component.container).toHaveTextContent('Sarah')

  const div = component.container.querySelector('.defaultDisplay')
  expect(div).not.toHaveTextContent(
    'www.baidu.com'
  )
  expect(div).not.toHaveTextContent(
    '12'
  )


})