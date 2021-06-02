import React from 'react'
const Header= ({name})=>(<h1>{name}</h1>)


const Content =({name,number})=>{
  
    return(
        <p>{name} {number}</p> 
    
    )
}


const Course = ({course})=>{
    var sum = course.parts.reduce(function (accumulator, currentPart) {
        return accumulator + currentPart.exercises;
      }, 0);
      
    
    return (
        <div>
            <Header name = {course.name} />
            
            {course.parts.map(part => 
            <Content key ={part.id} name = {part.name} number = {part.exercises}/>
            ) }
            <b> total of {sum} exercises</b>

            
          
            
            
            </div>
    )
}

export default Course