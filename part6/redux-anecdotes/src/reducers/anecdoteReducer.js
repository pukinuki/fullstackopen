import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      vote(state, action) {
        const id = action.payload
        const anecdoteToVote = state.find(a => a.id===id)
        const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes +1
        }
        return state
                .map(a => a.id!==id ? a : votedAnecdote)
                .sort((a,b) => b.votes - a.votes)
      }
      ,
      createAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    }
  })

export const {vote, setAnecdotes, createAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.newAnecdote(asObject(content))
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  
  const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}

  return async dispatch => {
    
    const changedAnecdote = await anecdoteService.voteAnecdote(anecdote.id, votedAnecdote)
    dispatch(vote(changedAnecdote.id))
  }
}

export default anecdoteSlice.reducer

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    //id: getId(),
    votes: 0
  }
}