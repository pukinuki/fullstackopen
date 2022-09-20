//import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { giveLikeToBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Blog = ({ blog, likeHandle }) => {
  const dispatch = useDispatch()

  const BlogDiv = styled.div`
    background: lightsteelblue;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid royalblue;
    border-radius: 3px;
  `

  const likeButtonHandle = () => {
    dispatch(giveLikeToBlog(blog))
  }

  if (!likeHandle) likeHandle = likeButtonHandle

  return (
    <BlogDiv>
      <div className='blog'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    </BlogDiv>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isUserBlog: PropTypes.bool.isRequired,
}

export default Blog
