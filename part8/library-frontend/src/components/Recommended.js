import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS_GENRE } from '../queries'

const Recommended = props => {
  if (!props.show) {
    return null
  }

  const meResult = useQuery(ME)
  const booksByGenreResult = useQuery(ALL_BOOKS_GENRE, {
    variables: {
      genre: meResult.loading ? '' : meResult.data.me.favouriteGenre,
    },
  })

  if (meResult.loading || booksByGenreResult.loading) {
    return <div>loading favourite genre...</div>
  }

  const getBooksByGenre = () => {
    if (booksByGenreResult.loading) return []

    return booksByGenreResult.data.allBooks
  }

  console.log(getBooksByGenre())

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your fauvorite genre{' '}
        <strong>{meResult.data.me.favouriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {getBooksByGenre().map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
