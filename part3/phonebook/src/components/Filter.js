import React from 'react';

const Filter = ({newFilter, setNewFilter}) => {
    
    const handleFilterChange = (event)=> {
        event.preventDefault()
        setNewFilter(event.target.value)
    }

    return (
        <div>filter shown with 
            <input value = {newFilter} onChange={handleFilterChange}/>
        </div>
    )
}


export default Filter