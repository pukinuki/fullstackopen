import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesResult from './components/CountriesResult'

const FindCountries = ({value, onChange}) =>
  <div>
    find countries 
    <input value={value} onChange={onChange}/>
  </div>


  
function App() {

  const [newCountry, setNewCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry,setShowCountry] = useState('')
  
  const countryChangeHandler = (event)=> {
    setNewCountry(event.target.value)
    setShowCountry('')
  } 

  const hook = ()=> {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => 
      setCountries(response.data)
    )
  }
  
  useEffect(hook,[])

  const countriesFilter = countries.filter(c=> c.name.common.toLowerCase().includes(newCountry.toLowerCase()) )

  return (
    <>
      <FindCountries value={newCountry} onChange={countryChangeHandler}/>
      <CountriesResult filter={countriesFilter} newCountry={newCountry} showCountry={showCountry} setShowCountry={setShowCountry} />
    </>

  )
}

export default App;
