import React from 'react'

function TitleSlacking({title , parg}) {
  return (
    <div className='bg-third p-4 text-center rounded-md border-solid border-2 border-gray-700 h-1/2 mb-20'>
         <h2 className=' font-bold uppercase text-4xl mb-3 color-gradient'>{title}</h2>
         <p className='text-white font-light text-lg'> {parg}</p>
    </div>
  )
}

export default TitleSlacking