import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { setNewUser } from './reducers/userReducer'
import UserList from './components/UserList'
import UserBlogs from './components/UserBlogs'
import BlogDetails from './components/BlogDetails'
import Navigation from './components/Navigation'

import './App.css'
import styled from 'styled-components'

const App = () => {
  //const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setNewUser(user))
    }
  }, [dispatch])

  const Page = styled.div`
    margin-top: 1em;
    padding: 1em;
    background: aliceblue;
  `

  if (user === null) {
    return (
      <Page className='container'>
        <LoginForm />
      </Page>
    )
  } else {
    return (
      <Page className='container'>
        <Navigation />
        <h1 style={{ marginTop: '1em' }}>Blogs App</h1>
        <Routes>
          <Route path='/' element={<BlogList />}></Route>
          <Route path='/users' element={<UserList />}></Route>
          <Route path='/users/:id' element={<UserBlogs />}></Route>
          <Route path='/blogs/:id' element={<BlogDetails />}></Route>
        </Routes>
      </Page>
    )
  }
}

export default App
