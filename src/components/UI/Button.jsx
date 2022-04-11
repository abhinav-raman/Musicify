import React from 'react'

const Button = (props) => {
  return (
    <button {...props} className="w-40 h-12 rounded-3xl bg-green-500 hover:bg-green-600 text-white" />
  )
}

export default Button