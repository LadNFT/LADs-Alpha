import React from 'react'

function TitleSection({title}) {
    return (
        <div className='flex items-center justify-center mb-10'>
            <h2 className='text-4xl md:text-6xl color-gradient font-bold'>{title}</h2>
        </div>
    )
}

export default TitleSection