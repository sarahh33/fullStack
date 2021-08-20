import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter= (props) => {
    const dispatch = useDispatch()

    return (
        <div>{/* NAME IS THE SAME, so only one value can be selected*/}
        {/*label for connecting clcikable text with button */}
        <label for='all'>all</label> <input id = 'all' type='radio' name='filter'
          onChange={() => dispatch(filterChange('ALL'))} />
        <label for='important'>important</label><input id='important' type='radio' name='filter'
          onChange={() => dispatch(filterChange('IMPORTANT'))} />
        <label for='nonimportant'>nonimportant</label><input id='nonimportant' type='radio' name='filter'
          onChange={() => dispatch(filterChange('NONIMPORTANT'))} /></div>
    )
}

export default VisibilityFilter