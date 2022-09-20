import { useField } from '../hooks/index'
import blogService from '../services/blogs'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentList = ({ blog }) => {
  const commentField = useField('text')
  const [comments, setComments] = useState(blog.comments)

  const handleSubmit = async e => {
    e.preventDefault()
    const responseComment = await blogService.addComment(blog.id, {
      text: commentField.inputFields.value,
    })
    setComments(responseComment.comments)
    commentField.reset('')
  }

  if (comments.length === 0) return <></>

  return (
    <div>
      <h2 style={{ marginTop: '1em' }}>Blog comments</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{ width: '60%', display: '-webkit-inline-box' }}>
          <Form.Control {...commentField.inputFields} />
          <Button
            variant='primary'
            type='submit'
            style={{ marginLeft: '0.5em' }}
          >
            add comment
          </Button>
        </Form.Group>
      </Form>
      <br />
      <ul>
        {comments.map(c => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentList
