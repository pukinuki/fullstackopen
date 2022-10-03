import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS_AND_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const allAuthorsAndBooksResult = useQuery(ALL_AUTHORS_AND_BOOKS)

  if (allAuthorsAndBooksResult.loading) {
    return <div>loading...</div>
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <button onClick={() => setPage('add')}>add book</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
        {token ? <button onClick={handleLogout}>logout</button> : <></>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={allAuthorsAndBooksResult.data.allAuthors}
        token={token}
      />

      <Books
        show={page === 'books'}
        books={allAuthorsAndBooksResult.data.allBooks}
      />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
