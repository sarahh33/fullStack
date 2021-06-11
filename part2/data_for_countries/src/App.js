import {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'

const Country=({country})=>{
  return(
    <div>{country.name}</div>
  )

}
const Lan=({lan})=>{
  return (
    <li>{lan.name}
</li>  )

}

const Details=({country})=>{
  console.log(country)
  return(
    <div><h1>{country.name}</h1>
    <p>capital: {country.capital} </p><p>population: {country.population}</p>
    <h3>languages</h3>
    <ul>{country.languages.map(lan => 
        <Lan key={lan.index} lan={lan} />)} </ul>
    <img src='https://restcountries.eu/data/che.svg' width="100" 
     ></img>
    </div>
  )
}
const Display=({a})=>
{   
  if (a.length<10){
    if (a.length==1){
      return (a.map(country => 
        <Details key={country.index} country={country} />))
    }
  return(a.map(country => 
    <Country key={country.index} country={country} />
  ))}

  else {
    return (<p>Too many matches, specify another filter</p>)
  }
}


function App() {
  
  const [displayedCountry, setDisplayedCountry]=useState([])
  const [country,setCountry]=useState([''])
  const handelCountryChange=(event)=>{
    console.log(event.target.value)
    setCountry(event.target.value)
    
  }

  useEffect(()=>{
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all').then(response=>{
      setDisplayedCountry(response.data)
      console.log(displayedCountry)
    })
  },[])
  
  const countryToShow = ''
  ?displayedCountry
  :displayedCountry.filter(note=>note.name.toLowerCase().includes(country)===true)


  return (
    <div>
      <label>find countries <input value ={country} onChange={handelCountryChange} /></label>
      <Display a={countryToShow}/>
      
      
    </div>
  );
}

export default App;
