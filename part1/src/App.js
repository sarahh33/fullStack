import React, { useState } from 'react'
const Display =({anecdote,vote})=>{
    return(
        <div>
            <h1>Anecdote of the day</h1>
        <p>{anecdote}</p>
        <p>has {vote} votes</p>
        
            </div>
    )
}

const Button =({handleClick,text})=> {
    return (
    <button onClick={handleClick}>{text}</button>)
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote,setVote]=useState(0)
  const [point,setPoint]= useState({0:0})
  let randomValue=0

  
  
  const setToSelect=(point,vote) =>()=>{
        
    randomValue = Math.floor(Math.random()*(anecdotes.length-1))
    const copy={...point}
    copy[randomValue]=vote
    

      return(
          setSelected(randomValue),
          
          setVote(0),
          setPoint(copy)
          
        )}

        
  const setToVote= (newValue)=>()=>{
      return (          
        setVote(newValue+1))}


        
  return (
    <div>
        <Display anecdote={anecdotes[selected]} vote={vote}/>
      
        <Button handleClick= {setToVote(vote)} text ='vote' />
        <Button handleClick={setToSelect(point,vote)} text='next anecdote' />
        <h1>Anecdote with the most votes</h1>
        {console.log(point)}
        {anecdotes[Object.keys(point).reduce((a, b) => point[a] > point[b] ? a : b)]}
    
    
    </div>
  )
}

export default App