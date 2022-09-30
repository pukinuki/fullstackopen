import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS_AND_BOOKS } from '../queries'
import Select from 'react-select'

const Authors = props => {
  const [birthName, setBirthName] = useState(null)
  const [birthYear, setBirthYear] = useState('')

  const [editBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS_AND_BOOKS }],
  })

  if (!props.show) {
    return null
  }

  const authors = props.authors

  const birthYearSubmit = async event => {
    event.preventDefault()
    editBirthYear({
      variables: { name: birthName.value, setBornTo: Number(birthYear) },
    })

    setBirthName(null)
    setBirthYear('')
  }

  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  //const handleSelect = object => setBirthName(object.value)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={birthYearSubmit}>
        <div>
          name
          <Select value={birthName} onChange={setBirthName} options={options} />
        </div>
        <div>
          born
          <input
            value={birthYear}
            type='number'
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
