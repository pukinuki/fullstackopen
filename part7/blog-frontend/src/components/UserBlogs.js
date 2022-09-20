import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserBlogs = () => {
  const userList = useSelector(state => state.userList)
  const match = useMatch('/users/:id')

  const user = match ? userList.find(u => u.id === match.params.id) : null

  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserBlogs
