import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from  './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message:'', type:'' })

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



  const handleLogout= () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

    setNotification({ message: 'Log out from blog list', type: 'info' })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 2000)
  }

  if (user === null) {
    return (
      <LoginForm
        notification={notification}
        setNotification={setNotification}
        setUser={setUser}
      />
    )
  }

  blogs.sort( (a,b) => b.likes - a.likes ).map(blog => console.log(blog.user.name, user.name))
  return (

    <div>
      <Notification message={notification.message} type = {notification.type} />
      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel={'create new blog'}>
        <CreateBlogForm
          setNotification={setNotification}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      </Togglable>
      <br/>
      {blogs.sort( (a,b) => b.likes - a.likes ).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} isUserBlog={user.name===blog.user.name} />
      )}

    </div>
  )
}

export default App
