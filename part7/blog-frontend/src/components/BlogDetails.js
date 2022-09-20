import { useSelector, useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { giveLikeToBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import CommentList from './CommentList'
import { Button } from 'react-bootstrap'

const BlogDetails = ({ likeHandle }) => {
  const blogList = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const match = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = match ? blogList.find(b => b.id === match.params.id) : null

  if (!blog) {
    return null
  }

  const likeButtonHandle = () => {
    dispatch(giveLikeToBlog(blog))
  }

  if (!likeHandle) likeHandle = likeButtonHandle

  const removeBlogHandle = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  const removeButton =
    user.name === blog.user.name ? (
      <Button
        className='remove-button'
        onClick={removeBlogHandle}
        variant='danger'
      >
        remove
      </Button>
    ) : (
      <></>
    )

  return (
    <>
      <h2 style={{ marginTop: '0.5em' }}>{blog.title}</h2>
      <div>{<a href={blog.url}>{blog.url}</a>}</div>
      <div>
        likes {blog.likes}{' '}
        <Button onClick={likeHandle} variant='warning'>
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      {removeButton}
      <CommentList blog={blog} />
    </>
  )
}

export default BlogDetails
