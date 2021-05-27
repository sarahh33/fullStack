import React, { useState } from 'react'



const Button=({ handleClick,text})=>(
  <button onClick={handleClick} >{text}</button>

)

const Statistic=({value,text})=>(
  <tr>

    <td>{text} : </td><td>{value}</td></tr>

)
 const Statistics= ({good, bad, neutral})=>{
   const all = good+bad+neutral
   const ave= all/3
   const positive = good/all*100+'%'

   return (
    <div>
      <Statistic value = {good} text = 'good' />
      <Statistic value = {neutral} text = 'neutral' />
      <Statistic value = {bad} text = 'bad' />
      <Statistic value ={all} text='all' />
      <Statistic value ={ave} text ='average' />
      <Statistic value = {positive} text ='positive'/>
     </div>
   )
 }

const History=({good, bad, neutral})=>{
  if (good+bad+neutral===0){
    return (<div>No feedback given</div>)
  }
  return (
    <div>
      
      <Statistics good={good} bad ={bad} neutral ={neutral}/></div>

  )

}


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
      <History good = {good} bad ={bad} neutral={neutral} />
      
      


    </div>
  )
}

export default App