import Notification from './Notification'
import { useState } from 'react'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { setNewUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      dispatch(setNewUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        setNotification(
          { message: 'Wrong username or password', type: 'error' },
          5
        )
      )
    }
  }

  return (
    <div>
      <div style={{ marginTop: '1em' }}>
        {' '}
        <h2>Log in to Blog App</h2>{' '}
      </div>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group style={{ width: '60%', marginTop: '1em' }}>
          <Form.Label>username</Form.Label>
          <Form.Control
            id='username'
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button style={{ marginTop: '1em' }} variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
