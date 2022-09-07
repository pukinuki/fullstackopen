import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const giveLike = async blog => {
  const likeBlog = { ...blog }
  likeBlog.likes++

  const response = await axios.put(baseUrl.concat(`/${blog.id}`), likeBlog)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl.concat(`/${blog.id}`), config)
  return response.data
}

export default { getAll, setToken, createBlog, giveLike, deleteBlog }