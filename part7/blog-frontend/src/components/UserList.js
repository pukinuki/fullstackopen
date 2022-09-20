import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllUsers } from '../reducers/userListReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const userList = useSelector(state => state.userList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const getUserList = () => {
    return userList.map(u => (
      <tr key={u.id}>
        <td>
          <Link to={`/users/${u.id}`}>{u.name}</Link>
        </td>
        <td>{u.blogs.length}</td>
      </tr>
    ))
  }

  return (
    <>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>{getUserList()}</tbody>
      </Table>
    </>
  )
}

export default UserList
