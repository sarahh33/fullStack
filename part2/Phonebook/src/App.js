import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
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
const Persons = ({ per }) => {
  return (

    per.map((person, i) => <Person key={i} person={person} />)


  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchName, setSearch] = useState('')

  useEffect(()=>{
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      console.log('promise')
      setPersons(response.data)
    })
  },[])

  const addName = (event) => {
    event.preventDefault()
    const newRecord = {
      name: newName,
      number: newNum
    }
    if (persons.some(person => person.name === newRecord.name)) {
      alert(newName + ' is already added to phonebook')
    }
    else {
      axios
      .post('http://localhost:3001/persons',newRecord)
      .then(response=>{setPersons(persons.concat(response.data))})
    }
    setNewName('')
    setNewNum('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const handleSearch = (event) =>setSearch(event.target.value)

  const personToShow = (searchName == '')
    ? persons
    : persons.filter(person => person.name.toLowerCase() == searchName.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} handle={handleSearch} />

      <h3>add a new</h3>
      <PersonForm add={addName} valueName={newName} handleName={handleNameChange} valueNum={newNum} handleNum={handleNumChange} />

      <h3>Numbers</h3>
      <Persons per={personToShow} />

    </div>
  )
}

export default App