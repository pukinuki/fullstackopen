import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm /> calls onSubmit with correct input values', async () => {
  const handleNewBlog = jest.fn(e => e.preventDefault())
  const user = userEvent.setup()

  render(<CreateBlogForm handleNewBlog={handleNewBlog} />)

  const input = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(input[0], 'title')
  await user.type(input[1], 'author')
  await user.type(input[2], 'https://www.cedint.upm.es')

  await user.click(createButton)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0].target).toHaveFormValues({
    Title: 'title',
    Author: 'author',
    URL: 'https://www.cedint.upm.es'
  })
})