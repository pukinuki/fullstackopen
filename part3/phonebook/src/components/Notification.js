import React from 'react'

const Notification = ({ message, type }) => {
    if (message === '') {
      return null
    }
  
    if (type==='error') {
      return (
        <div className='error'>
          {message}
        </div>
      )
    }
    else {
      return (
        <div className='notification'>
          {message}
        </div>
      )
    }
    
  }

  export default Notification