import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from  './components/LoginForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState({message:'', type:''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      setNotification({message: 'Wrong username or password', type: 'error'})
      setTimeout(() => {
        setNotification({message: '', type: ''})
      }, 5000)
    }
  }

  const handleLogout= () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')

    setNotification({message: 'Log out from blog list', type: 'info'})
      setTimeout(() => {
        setNotification({message: '', type: ''})
      }, 2000)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlogResponse = await blogService.createBlog({
        title, author, url
      })

      setBlogs(blogs.concat(newBlogResponse))
      setNotification({message: `a new blog ${newBlogResponse.title} by ${newBlogResponse.author} added`, type: 'info'})
      setTimeout(() => {
        setNotification({message: '', type: ''})
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      console.log(exception)
      setNotification({message: `Error: ${exception.response.data.error}`, type: 'error'})
      setTimeout(() => {
        setNotification({message: '', type: ''})
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <LoginForm
        notification={notification}
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleUsernameChange={({target}) => setUsername(target.value)}
        handlePasswordChange={({target}) => setPassword(target.value)}
      />
    )
  }

  return (
    
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <Notification message={notification.message} type = {notification.type} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
