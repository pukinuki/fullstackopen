import {React, useState} from 'react';
import personsService from '../services/persons'

const Persons = ({persons, setPersons}) => {
  
    const handleDeleteClick = (person) => {
      if (window.confirm(`Delete ${person.name}?`))
        personsService
          .remove(person.id)
          .then(deletedPerson => {
            setPersons(persons.filter(p => p.id!== person.id))
          })
    }

    return ( 
        persons.map(person => 
          <div key={person.id}>
            {person.name} 
            {person.number} 
            <button onClick={() =>handleDeleteClick(person)}>delete</button>
            <br/>
          </div>
      )
    )
}
 

export default Persons