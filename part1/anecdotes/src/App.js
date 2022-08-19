import { useState } from 'react'

const getRandomInt = (max) => Math.floor(Math.random() * max)

const Button = ({text, onClick}) => {
  return (
      <button onClick={onClick}>
        {text}
      </button>
  )
}

const Section = (props) => {
  return (
    <h1>
      {props.text}
    </h1>
  )
}

const VoteLine = ({text}) => text

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const randomAnecdote = getRandomInt(anecdotes.length)
  const [selected, setSelected] = useState(randomAnecdote)
  const [points, setVote] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(anecdotes[randomAnecdote])

  const checkMostVoted = (copy) => {
    let mostVotedIndex = 0
    for (let i=0; i<copy.length; i++) {
      if (copy[i]>=copy[mostVotedIndex]) {
        mostVotedIndex = i
        setMostVoted(anecdotes[i])
      }
    }
  }

  const getRandomSelected = () => {
    return (setSelected(getRandomInt(anecdotes.length)))
  }
    

  const giveVote = () => {
    const copy = [...points]
    copy[selected] = points[selected]+1

    checkMostVoted(copy)

    return (setVote(copy))
  }

  const DisplayMostVoted = () => {
   
    
    return (mostVoted)
  }

  return (
    <div>
      <Section text = 'Anecdote of the day' />
      {anecdotes[selected]}
      <br/>
      <VoteLine text = {['has',points[selected],'votes'].join(' ')}/>
      <br/>
      <Button text = 'vote' onClick={giveVote}/>
      <Button text = 'next anecdote' onClick={getRandomSelected}/>
      <Section text = 'Anecdote with most votes' />
      <DisplayMostVoted/>
    </div>
  )
}

export default App
