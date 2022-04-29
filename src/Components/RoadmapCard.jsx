import React from 'react';

function RoadmapCard({item}) {
    return (
        <div className={`flex ${!item.imgIsRight ? 'md:flex-row-reverse' : 'md:flex-row'}  justify-between items-center mb-10 gap-4 flex-col`} >
            <div className='flex-1'>
                <h4 className='text-white uppercase font-bold text-3xl mb-3'>{item.title}</h4>
                <p className='text-gray-400 text-lg'>{item.info}</p>
            </div>
            <div className='flex-1'>
                <img src={item.src} alt="" className={`${item.imgIsRight ? 'md:ml-auto' : 'md:mr-auto'} pt-3`}  /> 
            </div>
        </div>
    )
}

export default RoadmapCard;