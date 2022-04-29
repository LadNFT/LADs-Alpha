import React from 'react';
import light from '../Assets/endless_2.png'
import running from '../Assets/running.gif'

function HeaderEndless() {
  return (
    <header className='mt-0 h-fit block'>
      <h1 className='text-4xl md:text-6xl py-10 uppercase mb-5 leading-tight text-white font-extrabold text-center m-auto md:w-1/2'>
        Endless Possibilities <span className='color-gradient'>Lads Defi Ecosystem</span>
      </h1>
      <div>
        <img src={light} alt="" className='relative w-full md:h-full h-[700px]' />
        <img src={running} alt="" className='absolute top-1/2' />
      </div>
    </header>
  )
}

export default HeaderEndless