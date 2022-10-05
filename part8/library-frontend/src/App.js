import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS_AND_BOOKS, BOOK_ADDED } from './queries'
import Recommended from './components/Recommended'

import { updateCache } from './utils'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const allAuthorsAndBooksResult = useQuery(ALL_AUTHORS_AND_BOOKS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded

      window.alert(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_AUTHORS_AND_BOOKS }, addedBook)
    },
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (allAuthorsAndBooksResult.loading) {
    return <div>loading...</div>
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
        {token ? (
          <button onClick={() => setPage('recommended')}>recommend</button>
        ) : (
          <></>
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

      <Recommended show={page === 'recommended'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
