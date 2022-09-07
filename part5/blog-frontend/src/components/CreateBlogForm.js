import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = ({ setNotification, setBlogs, blogs }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlogResponse = await blogService.createBlog({
        title, author, url
      })

      setBlogs(blogs.concat(newBlogResponse))
      setNotification({ message: `a new blog ${newBlogResponse.title} by ${newBlogResponse.author} added`, type: 'info' })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      console.log(exception)
      setNotification({ message: `Error: ${exception.response.data.error}`, type: 'error' })
      setTimeout(() => {
        setNotification({ message: '', type: '' })
      }, 5000)
    }
  }
  return(
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
              title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
              author:
          <input
            type="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
              url:
          <input
            type="url"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
export default CreateBlogForm