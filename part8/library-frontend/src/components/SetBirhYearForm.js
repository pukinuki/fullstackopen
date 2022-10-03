import Select from 'react-select'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS_AND_BOOKS } from '../queries'

const setBirthYearForm = props => {
  const [birthName, setBirthName] = useState(null)
  const [birthYear, setBirthYear] = useState('')
  const [editBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS_AND_BOOKS }],
  })
  const authors = props.authors

  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  const birthYearSubmit = async event => {
    event.preventDefault()
    editBirthYear({
      variables: { name: birthName.value, setBornTo: Number(birthYear) },
    })

    setBirthName(null)
    setBirthYear('')
  }

  if(props.token) {
    return (
      <div><h2>Set birthyear</h2>
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
  else
    return <></>
}

export default setBirthYearForm