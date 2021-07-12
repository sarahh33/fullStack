import React, { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification=({message})=>{
  const notiStyle={
    color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  }
  if (message ===null){
    return null
  }
  return (
    <div style={notiStyle}>{message}</div>
  )

}

const Person = ({ person,deletRecord }) => {
  return (
    <li>{person.name} {person.number}
    <button onClick={()=>{if (window.confirm(`Delete ${person.name}?`)) {deletRecord()
}}}>delet</button></li>
  )
}
const Filter = ({ value, handle }) => {
  return (
    <form>
      <div>filter shown with</div>
      <input value={value} onChange={handle} />
    </form>)
}

const PersonForm = ({ add, valueNum, valueName, handleName, handleNum }) => {
  return (
    <form onSubmit={add}>
      <div>
        name: <input value={valueName} onChange={handleName} />
      </div>
      <div>number: <input value={valueNum} onChange={handleNum} /></div>
      <div>
        <button type="submit">add</button>

      </div>
    </form>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchName, setSearch] = useState('')
  const [errorMessage, setErrorMessage]= useState('something wrong happens')
  const [nameIsValid, setValid]= useState(true)

  useEffect(()=>{
    console.log('effect')
    personService
    .getAll()
    .then(response=>{setPersons(response.data)})
   
  },[])

  const addName = (event) => {
    event.preventDefault()
    const newRecord = {
      name: newName,
      number: newNum
    }

    if (newRecord.name <4 || newRecord.number<9){
      setErrorMessage('content length is not ok')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
    }
    else if (persons.some(person => person.name === newRecord.name)){
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        
        personService
        .updateOld(personToShow.filter(n=> n.name===newRecord.name)[0].id,newRecord)
        .then(response=>{setPersons(personToShow.map(person=> person.name!==newRecord.name
          ?person
          :response.data
          ))})
        
        setErrorMessage(`'${newName}' was updated`)
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
        
      }} 
    

    else {
      personService
      .update(newRecord)
      .then(response=>{setPersons(personToShow.concat(response.data))})
      .catch(error => {console.log(error.response.data)})
      setErrorMessage(`'${newName}' was added`)
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
    }
    setNewName('')
    setNewNum('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const handleSearch = (event) =>setSearch(event.target.value)

  const deletRecordOf =(id)=>{
    
    const person = personToShow.find(n=> n.id===id)
    console.log(id)
    
    personService
    .delet(id)
    personService
    .getAll()
    .then(response=> {setPersons(response.data)}) 
    

  }
  
  const personToShow = (searchName == '')
    ? persons
    : persons.filter(person => person.name.toLowerCase() == searchName.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message= {errorMessage}/>
      <Filter value={searchName} handle={handleSearch} />

      <h3>add a new</h3>
      <PersonForm add={addName} valueName={newName} handleName={handleNameChange} valueNum={newNum} handleNum={handleNumChange} />

      <h3>Numbers</h3>
      
       {personToShow.map((person, i) => <Person key={i} person={person} deletRecord={()=>deletRecordOf(person.id)} />)}

    </div>
  )
}

export default App