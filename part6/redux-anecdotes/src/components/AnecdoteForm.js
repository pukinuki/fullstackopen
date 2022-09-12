//import { useDispatch } from 'react-redux'
import {connect} from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  
  //const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    //dispatch(newAnecdote(anecdote))
    props.newAnecdote(anecdote)
  }

    return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
    )
}

const mapDispatchToProps = {
  newAnecdote
}


export default connect(null, mapDispatchToProps)(AnecdoteForm)