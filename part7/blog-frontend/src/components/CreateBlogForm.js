import { useState } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

const CreateBlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreateBlog = async event => {
    event.preventDefault()

    try {
      const newBlogResponse = await blogService.createBlog({
        title,
        author,
        url,
      })

      dispatch(createNewBlog(newBlogResponse))

      dispatch(
        setNotification(
          {
            message: `a new blog ${newBlogResponse.title} by ${newBlogResponse.author} added`,
            type: 'info',
          },
          5
        )
      )

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      dispatch(
        setNotification(
          {
            message: `Error: ${exception.response.data.error}`,
            type: 'error',
          },
          5
        )
      )
    }
  }

  if (!handleNewBlog) handleNewBlog = handleCreateBlog

  return (
    <>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group style={{ width: '60%' }}>
          <Form.Label>Title: </Form.Label>
          <Form.Control
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>Author: </Form.Label>
          <Form.Control
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>URL: </Form.Label>
          <Form.Control
            id='url'
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button
          style={{ marginTop: '1em' }}
          variant='primary'
          id='create-button'
          type='submit'
        >
          create
        </Button>
      </Form>
    </>
  )
}
export default CreateBlogForm
