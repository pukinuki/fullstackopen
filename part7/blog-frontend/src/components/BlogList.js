import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { setInitialBlogs } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector(state =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  )
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitialBlogs())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Togglable buttonLabel={'create new blog'}>
        <CreateBlogForm />
      </Togglable>

      <h3 style={{ marginTop: '1em' }}>List of blogs</h3>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            isUserBlog={user.name === blog.user.name}
          />
        ))}
    </div>
  )
}

export default BlogList
