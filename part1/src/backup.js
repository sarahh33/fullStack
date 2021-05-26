import React,{useState} from 'react'


const Display= (props)=>{
  return(
  <div>{props.value}</div>)
}

const History= (props) =>{
  if (props.allClicks.length ===0){
    return (
      <div>
        the App is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
      </div>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  
  const [value, setValue] = useState(10)
  const setToValue = (newValue)=> ()=>{setValue(newValue)}
  

return (
  <div>
    <Display value={value} />
    <Button handleClick={setToValue(1000)} text= 'thousand'/>
    <Button handleClick={setToValue(0)} text = 'reset'/>
    <Button handleClick={setToValue(value+1)} text = 'increment'/>
    </div>
)

}


export default App