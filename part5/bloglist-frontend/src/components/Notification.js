import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message,color } = useSelector(store => store.notification)
  console.log(color)
  if (message === null) {
    return null
  }
  return (
    <div >
      <p className={color}>{message}</p>
    </div>
  )
}

export default Notification