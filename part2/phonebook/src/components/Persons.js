import React from 'react';

const Persons = ({persons,newFilter}) => {
    const personsToShow = 
    newFilter === '' ? persons 
    : persons.filter(p=> p.name.includes(newFilter))

    return ( 
        personsToShow.map(person => 
          <div key={person.id}>{person.name} {person.number}<br/></div>
      )
    )
}
 

export default Persons