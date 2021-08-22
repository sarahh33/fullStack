import React from 'react'
import { connect } from 'react-redux'
import { filterValid } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = ({target}) => {
      // input-field value is in variable event.target.value
      
      props.filterValid(target.value)
      
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
const mapDispatchToProps =  {
  filterValid
}
  const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter