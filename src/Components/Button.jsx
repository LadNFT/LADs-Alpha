import React from 'react'

function Button({title , onClick ,classProps}) {
  return (
    <button onClick={onClick} className={`${classProps} bg-gradient-to-r from-primary to-secondary py-2 px-5 rounded-lg text-white uppercase `} >{title}</button>
  )
}

export default Button