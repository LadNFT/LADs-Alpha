import React from 'react';
import transactionImgOne from '../Assets/p4.png'
import transactionImgTwo from '../Assets/p1.png'
import TransitionCard from './TransitionCard';
import TitleSection from './TitleSection';

function TransitionSection() {
  return (
    <section className="section">
        {/* --title component-- */}
       <TitleSection title="Transition" />
        <div className="container">
            <div className="grid-system justify-between items-center">
                {/* --images card component-- */}
               <TransitionCard src={transactionImgOne} title="Forgotten Lad" />
               <TransitionCard src={transactionImgTwo} title="Present Lad" classProps="md:ml-auto" />
            </div>
        </div>
    </section>
  )
}

export default TransitionSection