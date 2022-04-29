import React from 'react'
import { goToLinkOutside } from '../utiles/functions'
import { Forgotten_Lads_path, Present_Lads_path } from '../utiles/LinksOutside'
import TitleSection from './TitleSection'

function MintingSection() {

  return (
    <section>
        <TitleSection title="Minting"/>
        <div className="container">
                <div className="minting-card">
                    <p className='text-white md:text-2xl text-center mb-3'>Sold out! Check out the Lads collections on OASIS :</p>
                    {/* --links-- */}
                    <button className='text-blue-600 mb-3' onClick={() => goToLinkOutside(Forgotten_Lads_path)}>Forgotten Lads</button>
                    <button className='text-blue-600 mb-3' onClick={() => goToLinkOutside(Present_Lads_path)}>Present Lads</button>
                </div>
            </div>
    </section>
  )
}

export default MintingSection