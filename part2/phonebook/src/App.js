import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Header from './components/Header'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = ()=> {
    axios
    .get('http://localhost:3001/persons')
    .then(response =>
      setPersons(response.data)
    )
  }
  
  useEffect(hook,[])

  return (
    <div>
      <Header header={'Phonebook'}/>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <Header header={'add a new'}/>
      <PersonForm 
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
      />
      <Header header={'Numbers'}/>
      <Persons persons = {persons} newFilter = {newFilter}/>

    </div>
  )
}

export default App
