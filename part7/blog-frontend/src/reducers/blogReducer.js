import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    clearBlogs() {
      return []
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      return state.map(b => (b.id !== action.payload.id ? b : action.payload))
    },
    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions

export const setInitialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createNewBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const giveLikeToBlog = blog => {
  return async dispatch => {
    const likeBlog = await blogService.giveLike(blog)
    dispatch(updateBlog(likeBlog))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch(deleteBlog(blog.id))
  }
}

export default blogSlice.reducer
