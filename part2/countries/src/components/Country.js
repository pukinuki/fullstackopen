import React from 'react'
import axios from 'axios'

const Languages = ({languages}) => {

    return (
        <>
            <h2><b>languages:</b></h2>
            <ul>
                {Object.values(languages).map(l => <li key={l}>{l}</li>)}
            </ul>
        </>
    )
}

const Weather = ({capital}) => {
    const api_key = process.env.REACT_APP_API_KEY

    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
        .then(response =>
            console.log(response.data)
            )
    return (
        <>
        <h3>Weather in {capital}</h3>
        <div>temperature</div>
        <div>wind</div>
        </>

    )

}
    
const Country = ({country}) => {
    return ( 
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <Languages languages={country.languages} />
            <img src = {country.flags.png} alt = 'Country flag'/>
            <Weather capital={country.capital[0]} />
        </>
    )
}
       
export default Country