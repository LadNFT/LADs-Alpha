import React from 'react'

function TransitionCard({src , title , classProps}) {
    return (
        <div className="flex justify-center text-center flex-col mb-5">
            <h3 className={`text-white text-2xl w-1/2 m-auto md:m-0 md:w-[400px] ${classProps}`}>{title}</h3>
            <img src={src} alt="" className={`w-1/2 m-auto md:m-0 md:w-[400px] pt-3 ${classProps}`} />
        </div>
    )
}

export default TransitionCard