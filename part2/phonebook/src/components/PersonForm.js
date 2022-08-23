import React from 'react'
import personsService from '../services/persons'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const addPerson = (event) => {
        event.preventDefault()
    
        const personInPhonebook = persons.filter(p=>p.name===newName)
        if (personInPhonebook.length===1) {
          //alert(`${newName} is already added to phonebook`)
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const newPhonePerson = {...personInPhonebook[0], number: newNumber} 
            personsService
              .update(newPhonePerson.id,newPhonePerson)
              .then(returnedPerson => setPersons(persons.map(p => p.id!== newPhonePerson.id ? p : returnedPerson)))
          }
           
        }
        else {
          const person = { 
            id : persons.length+1,
            name: newName,
            number: newNumber
          }
          
          personsService
            .create(person)
            .then(returnedPerson=> {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
             })

        }
      }
    
    const handleNameChange = (event)=> {
       setNewName(event.target.value)
    }
    
    const handleNumberChange = (event)=> {
       setNewNumber(event.target.value)
     }

    return(
        <form onSubmit={addPerson}>
            <div>
              name: <input 
              value= {newName}
              onChange={handleNameChange}
              />
            </div>
            <div>
              number: <input 
              value= {newNumber}
              onChange={handleNumberChange}
              />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
    )
}

export default PersonForm


    