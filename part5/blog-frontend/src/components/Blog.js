import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, isUserBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeButtonHandle = async () => {
    const updateBlog = await blogService.giveLike(blog)
    setBlogs(blogs.map( b => b.id!==blog.id ? b : updateBlog))
  }

  const removeBlogHandle = async () => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter( b => b.id!== blog.id))
    }
  }

  const removeButton = isUserBlog ? <button onClick={removeBlogHandle}>remove</button> : <></>

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>{'view'}</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>{'hide'}</button>
        <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={likeButtonHandle}>like</button></div>
          <div>{blog.user.name}</div>
          {removeButton}
        </div>
      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  isUserBlog: PropTypes.bool.isRequired
}

export default Blog