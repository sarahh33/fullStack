import React from 'react'
import { useDispatch } from 'react-redux'
import { filterValid } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch=useDispatch()

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      const content= event.target.value
      dispatch(filterValid(content))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

export default Filter