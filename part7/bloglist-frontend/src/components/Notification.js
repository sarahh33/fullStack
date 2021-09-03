import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const { message,color } = useSelector(store => store.notification)

  if (!message) {
    return null
  }
  return (
    <div >
      <Alert severity={color}>
        {message}</Alert>
    </div>
  )
}

export default Notification