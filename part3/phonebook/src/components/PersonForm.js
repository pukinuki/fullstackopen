import React from 'react'
import personsService from '../services/persons'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotification}) => {
    const addPerson = (event) => {
        event.preventDefault()
    
        const personInPhonebook = persons.filter(p=>p.name===newName)
        if (personInPhonebook.length===1) {
          //alert(`${newName} is already added to phonebook`)
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const newPhonePerson = {...personInPhonebook[0], number: newNumber} 
            personsService
              .update(newPhonePerson.id,newPhonePerson)
              .then(returnedPerson => {
                setPersons(persons.map(p => p.id!== newPhonePerson.id ? p : returnedPerson))
                const notif = {
                  message: `Phone changed for ${returnedPerson.name}`,
                  type: 'notification'
                }
                setNotification(notif)
                setTimeout(() => {
                  setNotification({message:'', type:''})
                }, 5000)
              })
              .catch(error => {
                console.log(error)
                const isValidationError = error.response.status===400
                
                let errorNotif = {}
                if (isValidationError)
                  errorNotif = {
                    message: error.response.data.error,
                    type: 'error'
                  }
                else
                  errorNotif = {
                    message: `Information of ${newPhonePerson.name} has already been removed from server`,
                    type: 'error'
                  }

                setNotification(
                  errorNotif
                )
                setTimeout(() => {
                  setNotification({message:'', type:''})
                }, 5000)

                if(!isValidationError)
                  setPersons(persons.filter(p => p.id!== newPhonePerson.id))
              }) 
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

              const notif = {
                message: `Added ${returnedPerson.name}`,
                type: 'notification'
              }
              setNotification(notif)
              setTimeout(() => {
                setNotification({message:'', type:''})
              }, 5000)
              
             })
             .catch(error=>{
              const errorNotif = {
                message: error.response.data.error,
                type: 'error'
              }
              setNotification(
                errorNotif
              )
              setTimeout(() => {
                setNotification({message:'', type:''})
              }, 5000)

              if (error.response.status===409)
                setPersons(persons.concat(error.response.data.person))
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


    