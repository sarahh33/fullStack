import React from 'react'
const Header =(props) => {
  
  return (
    
      <h1>
        {props.course}
      </h1>
  
    
  )

}
const Part =(props) => {
  
  return(
 
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    

  )
}

const Content =(props) => {
  
  return (
    <div>
      <Part part={props.pt1}  />
      <Part part={props.pt2}  />
      <Part part={props.pt3}  />
    </div>

  )
}

const Total =(props)=>{
  
  
  return(
    <div>
      <p>
      Number of exercises {props.pt1.exercises+props.pt2.exercises+props.pt3.exercises}
      </p>
    </div>
  )
  
}



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content pt1={parts[0]} pt2={parts[1]} pt3={parts[2]}  />
      <Total pt1={parts[0]} pt2={parts[1]} pt3={parts[2]} />
    </div>
  )
}


export default App