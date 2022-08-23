import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Header from './components/Header'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = ()=> {
    personsService
    .getAll()
    .then(initialPersons =>
      setPersons(initialPersons)
    )
  }
  
  useEffect(hook,[])

  const filterPersons = () =>
    persons.filter(p=>p.name.toLowerCase().includes(newFilter.toLowerCase()))

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
      <Persons persons = {filterPersons()} setPersons={setPersons}/>

    </div>
  )
}

export default App
