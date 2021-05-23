import React from 'react'
const Header =(props) => {
  console.log([props])
  return (
    
      <h1>
        {props.course}
      </h1>
  
    
  )

}
const Part =(props) => {
  return(
    <div>
      <p>
        {props.part} {props.ex}
      </p>
    </div>

  )
}

const Content =(props) => {


  return (
    <div>
      <Part part={props.pt1} ex = {props.ex1} />
      <Part part={props.pt2} ex = {props.ex2} />
      <Part part={props.pt3} ex = {props.ex3} />
      </div>

  )
}

const Total =(props)=>{
  return(
    <div>
      <p>
      Number of exercises {props.nm}
      </p>
    </div>
  )
  
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content pt1={part1.name} pt2 = {part2.name} pt3 = {part3.name} ex1= {part1.exercises} ex2= {part2.exercises} ex3 = {part3.exercises}/>
      <Total nm= {part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}


export default App