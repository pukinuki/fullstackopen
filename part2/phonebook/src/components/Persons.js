import {React} from 'react';
import personsService from '../services/persons'

const Persons = ({persons, setPersons, setNotification}) => {
  
    const handleDeleteClick = (person) => {
      if (window.confirm(`Delete ${person.name}?`))
        personsService
          .remove(person.id)
          .then((deletedPerson) => {
            const notif = {
              message: `${person.name} was deleted from server`,
              type: 'notification'
            }
            setNotification(
              notif
            )
            setTimeout(() => {
              setNotification({message:'', type:''})
            }, 5000)
            setPersons(persons.filter(p => p.id!== person.id))
          })
          .catch(error => {
            const errorNotif = {
              message: `${person.name} was already removed from server`,
              type: 'error'
            }
            setNotification(
              errorNotif
            )
            setTimeout(() => {
              setNotification({message:'', type:''})
            }, 5000)
            setPersons(persons.filter(p => p.id!== person.id))
          })
          
    }

    return ( 
        persons.map(person => 
          <div key={person.id}>
            {person.name} {person.number} {' '}
            <button onClick={() =>handleDeleteClick(person)}>delete</button>
            <br/>
          </div>
      )
    )
}
 

export default Persons