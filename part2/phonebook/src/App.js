import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Header from './components/Header'

const App = () => {

  const [persons, setPersons] = useState([
    { 
      id: 0,
      name: 'Arto Hellas', 
      number: '39-44-5323523'
    }
  ]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
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
