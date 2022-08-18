import { useState } from 'react'


const Section = (props) => {
  return (
    <h1>
      {props.text}
    </h1>
  )
}

const Button = ({text, onClick}) => {
  return (
      <button onClick={onClick}>
        {text}
      </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.sum > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text = 'good' value = {props.good}></StatisticLine>
          <StatisticLine text = 'neutral' value = {props.neutral}></StatisticLine>
          <StatisticLine text = 'bad' value = {props.bad}></StatisticLine>
          <StatisticLine text = 'all' value = {props.sum}></StatisticLine>
          <StatisticLine text = 'average' value = {props.average}></StatisticLine>
          <StatisticLine text = 'positive' value = {props.positive.join(' ')}></StatisticLine>
        </tbody>
      </table>
    )
  }
  else {
    return 'No feedback given'
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const sum = good + neutral + bad

  // functions
  const increaseGood =  () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  const average = () =>  (good - bad) / sum
  const positive = () => [100*(good)/sum, '%']

  return (
    <div>
      <Section text = 'give feedback'/>
      <Button text = 'good' onClick = {increaseGood}></Button>
      <Button text = 'neutral' onClick = {increaseNeutral}></Button>
      <Button text = 'bad' onClick = {increaseBad}></Button>
      <Section text = 'statistics' />
      <Statistics sum = {sum} good= {good} neutral = {neutral} bad = {bad}
        average = {average()} positive = {positive()} />
      
    </div>
  )
}

export default App