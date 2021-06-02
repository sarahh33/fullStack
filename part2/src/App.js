import React from 'react'
const Header= ({name})=>(<h1>{name}</h1>)


const Content =({name,number})=>{
  
    return(
        <p>{name} {number}</p> 
    
    )
}





const Course = ({course})=>{
    var sum = course.parts.reduce(function (accumulator, currenPart) {
        return accumulator + currenPart.exercises;
      }, 0);
      
    
    return (
        <div>
            <Header name = {course.name} />
            
            {course.parts.map(part => 
            <Content key ={part.id} name = {part.name} number = {part.exercises}/>
            ) }
            <p> total of {sum} exercises</p>

            
          
            
            
            </div>
    )
}


const App = () => {
    const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
            name:'Redux',
            exercises:11,
            id:4
        }
      ]
    }
  
    return <Course course={course} />
  }

export default App