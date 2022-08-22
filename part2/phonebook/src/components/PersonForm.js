import React from 'react';

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
    const addPerson = (event) => {
        event.preventDefault()
    
        if (persons.filter(p=>p.name===newName).length===1) {
          alert(`${newName} is already added to phonebook`)
        }
        else {
          const person = { 
            id : persons.length+1,
            name: newName,
            number: newNumber
          }
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
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


    