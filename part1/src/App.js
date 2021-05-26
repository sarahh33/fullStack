import React, { useState } from 'react'



const Button=({ handleClick,text})=>(
  <button onClick={handleClick} >{text}</button>

)

const Display=({value,text})=>(

    <p>{text} : {value}</p>

)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValue=(setValue, newValue)=>()=>{setValue(newValue+1)}


  return (
    <div>
      <h1>give feedback</h1>
      <Button  handleClick={setToValue(setGood, good)} text='good'/>
      <Button  handleClick={setToValue(setNeutral,neutral)} text='neutral'/>
      <Button  handleClick={setToValue(setBad, bad)} text='bad'/>

      <h1>statistcs</h1>
      <Display value = {good} text = 'good' />
      <Display value = {neutral} text = 'neutral' />
      <Display value = {bad} text = 'bad' />

    </div>
  )
}

export default App