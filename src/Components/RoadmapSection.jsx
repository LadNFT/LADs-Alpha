import React from 'react'
import TitleSection from './TitleSection'
import imgOne from '../Assets/p3.png'
import imgTwo from '../Assets/p2.png'
import imgThree from '../Assets/furute.png'
import RoadmapCard from './RoadmapCard'

function RoadmapSection() {

    const roadMapDetails = [
        {
            title:"Stage 1: Forgotten Lads         ",
            info:"This stage introduces our first drop of NFTs; a generative art collection of 7500 Forgotten Lads. Once minted, the holders of these NFTs will have the unique opportunity to make them their own, by adding their own story as the NFTs description. In a purposeful attempt at highlighting your individual journey, each holder is encouraged to talk about the trials of their past, and what they have been through.",
            src:imgOne,
            imgIsRight:true
        },
        {
            title:"Stage 2: Present Lads",
            info:"Our next stage of progression involves our second collection of NFTs - the Present Lads. These NFTs will be given to current holders to match the Forgotten Lads NFTs that they hold. In a similar fashion to the Forgotten Lads NFTs, holders will be able to provide a description for their Present Lads. Holders are now encouraged to include details of where they are in their life right now, and how that has changed since the events described in their Forgotten Lad descriptions.",
            src:imgTwo,
            imgIsRight:false
        },
        {
            title:"Stage 3: The Future",
            info:"The final stage on our journey is the introduction of our $LADS token, and a staking mechanic. At this point, holders will be given the opportunity to stake their Forgotten Lads NFTs in order to earn a number of LAD$ tokens every month, for the next 20 years. This offers a means of passive income for our community, and displays a commitment to the future. By staking your NFTs, you’re deciding to put all of your effort into your future and releasing the weight of your past struggles and present-day stresses. Just as we all should",
            src:imgThree,
            imgIsRight:true
        }
    ]

    return (
        <section className='section'>
            <TitleSection title='Lads Roadmap' />
            <p className='text-white font-light md:w-1/2 m-auto text-center mb-16 px-3'>The Present Lads project aims to show progressive nature of life by bringing light to the
                multiple versions of ourselves that exist. We’ll do this in three stages.
            </p>
            <div className="container">
                {/* --make map at sections-- */}
                {roadMapDetails.map((item,index) => (
                    <RoadmapCard item={item} key={index} />
                ))}
            </div>
        </section>
    )
}

export default RoadmapSection