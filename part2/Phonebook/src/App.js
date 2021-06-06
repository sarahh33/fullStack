import React, { useState } from 'react'

const Person =({person})=>{
return (
  <div>{person.name}</div>
)
}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName=(event)=>{
    event.preventDefault()
    
    const newRecord ={name:newName}

    if (persons.some(person => person.name===newRecord.name)){
      alert( newName+' is already added to phonebook')
    }
    else{
      setPersons(persons.concat(newRecord))
      console.log(newRecord===persons[3])
      setNewName('')  }

    
    
  }
  const handleNoteChange=(event)=>{
   
      setNewName(event.target.value)
    
}  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        
        <div>
          name: <input value = {newName}  onChange= {handleNoteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person,i)=> <Person key = {i} person = {person}/>)
        }
    </div>
  )
}

export default App