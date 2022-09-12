import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const giveVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted ${anecdote.content}`, 5))
    /*dispatch(createNotification(`You voted ${anecdote.content}`))
    setTimeout(() => dispatch(resetNotification()), 5000)*/
  } 

    return (
    <>
      {anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => giveVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </>
    )
}


export default AnecdoteList