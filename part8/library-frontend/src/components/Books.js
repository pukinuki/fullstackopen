import BooksFilter from './BooksFilter'
import { useState } from 'react'
import { ALL_BOOKS_GENRE } from '../queries'
import { useQuery } from '@apollo/client'

const Books = props => {
  if (!props.show) {
    return null
  }

  const [filter, setFilter] = useState('')
  const booksByGenreResult = useQuery(ALL_BOOKS_GENRE, {
    variables: {
      genre: filter,
    },
  })

  if (booksByGenreResult.loading)
    return <div>Loading books by genre {filter}...</div>

  const books = filter !== '' ? booksByGenreResult.data.allBooks : props.books

  const allGenres = () => {
    return props.books
      .map(b => b.genres)
      .flat(1)
      .filter((v, i, a) => a.indexOf(v) === i)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BooksFilter genres={allGenres()} setFilter={setFilter} />
    </div>
  )
}

export default Books
