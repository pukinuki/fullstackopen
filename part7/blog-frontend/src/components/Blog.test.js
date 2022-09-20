import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container
  let blog

  beforeEach(() => {
    blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'https://www.testurl.com',
      likes: 5,
      user: {
        name: 'Test name',
        username: 'testname',
      },
    }
  })

  test('renders title and author by default but not url or number of likes', () => {
    container = render(
      <Blog blog={blog} blogs={[]} setBlogs={() => null} isUserBlog={true} />
    ).container
    let div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Test blog Test author')

    div = container.querySelector('.blog-details')
    expect(div).toHaveStyle('display: none')
  })

  test('clicking the button "view" of a blog show url and number of likes', async () => {
    container = render(
      <Blog blog={blog} blogs={[]} setBlogs={() => null} isUserBlog={true} />
    ).container
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the button "like" of a blog twice calls the event handler twice', async () => {
    const mockLikeHandler = jest.fn()
    container = render(
      <Blog
        blog={blog}
        likeHandle={mockLikeHandler}
        blogs={[]}
        setBlogs={() => null}
        isUserBlog={true}
      />
    ).container
    const user = userEvent.setup()
    const button = screen.getByText('like')

    await user.click(button)
    await user.click(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
