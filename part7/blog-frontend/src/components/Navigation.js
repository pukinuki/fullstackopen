import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setBlogs([]))
    dispatch(
      setNotification({ message: 'Log out from blog list', type: 'info' }, 5)
    )
  }

  const padding = {
    paddingRight: 5,
    verticalAlign: 'sub',
  }

  return (
    <Navbar
      className='classNav'
      collapseOnSelect
      expand='lg'
      //bg='light'
      variant='light'
    >
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/'>
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link style={padding} to='/users'>
              users
            </Link>
          </Nav.Link>

          <Nav.Link href='#' as='span'>
            <em style={padding}>logged in as {user.name}</em>
            <Button variant='secondary' onClick={handleLogout}>
              logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
