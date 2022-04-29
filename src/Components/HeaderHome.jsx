import React from 'react';
import HeroImg from '../Assets/hero_img.png'

function HeaderHome() {

  return (
    <div className="section overflow-hidden" id='header'>
        <div className="container">
            <div className="grid-system items-center justify-center">
                {/* --hero text-- */}
                <div className="text-center md:text-left">
                    <h1 className='text-4xl md:text-6xl uppercase mb-5 leading-tight text-white font-extrabold'>Old Lads to new lads <span className="color-gradient">transition</span> </h1>
                    <p className='text-white uppercase text-2xl md:text-3xl font-normal'>now you can transite your old lads to present lads </p>
                </div>
                {/* --hero img-- */}
                <div className="mr-0 xl:mr-[-7rem]">
                    <img src={HeroImg} alt="" className='w-full' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderHome