import React from 'react'
import Country from './Country'

const CountriesResult = ({filter, newCountry, showCountry, setShowCountry}) => {
    
    if (filter.length >10) 
        return newCountry !== '' ? ('Too many matches, specify another filter') : ''
    else if (filter.length>1) {
        if (showCountry!=='') {
            return <Country country={filter.filter(c=> c.name.common === showCountry)[0]}/>
        }
        else {
            return filter.map(c=> 
                {
                    return(
                        <div key={c.cca2}>
                            {c.name.common} 
                            <button onClick={()=>setShowCountry(c.name.common)}>
                                show
                            </button>
                        </div>
                    )
                          
                } 
            )
        }

      }
        
      else if (filter.length===1)
        return <Country country={filter[0]}/>
      else 
        return newCountry !== '' ? ('No match found with that filter') : ''
    

  }

  export default CountriesResult