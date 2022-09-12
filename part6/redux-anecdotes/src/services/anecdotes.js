import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const voteAnecdote = async (id, anecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, anecdote)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, newAnecdote, voteAnecdote }