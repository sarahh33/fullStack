import {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'



const Country=({country})=>{
  const [show, setShow]=useState(true)
  const detailToShow = show
  ?''
  : <Details key={country.index} country={country} />

  return(
    <div>{country.name}
    <button onClick={()=> {setShow(!show) }}>show</button>
    {detailToShow}
    </div>
    
  )

}
const Lan=({lan})=>{
  return (
    <li>{lan.name}
</li>  )

}

const Details=({country})=>{
  console.log(country)
  
  useEffect(()=>{
    const params = {
      access_key: '6af890b509b0d32c011e15ff55348dbb',
      query: country.capital
    }
    console.log('effect2')
    axios
    .get('https://api.weatherstack.com/current', {params}).then(response=>{
      
    const apiResponse = response.data;
    console.log(apiResponse)
      console.log('Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃');
    }).catch(error => {
      console.log(error);
    })
  },[])


  return(
    <div><h1>{country.name}</h1>
    <p>capital: {country.capital} </p><p>population: {country.population}</p>
    <h3>languages</h3>
    <ul>{country.languages.map(lan => 
        <Lan key={lan.index} lan={lan} />)} </ul>
    <img src={country.flag} width="100" 
     ></img>

     <h3>Weather in {country.name}</h3>
     <p>temperature: </p>
     
    </div>
  )
}
const Display=({aCountry})=>
{   
  
  if (aCountry.length<10){
    if (aCountry.length==1){
      return (aCountry.map(country => 
        <Details key={country.index} country={country} />))
    }
  return(
    aCountry.map(country => 
    <Country key={country.index} country={country} />
  ))

}

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
      <Display aCountry={countryToShow}/>
      
      
    </div>
  );
}

export default App;
