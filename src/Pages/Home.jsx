import React from 'react'
import { HeaderHome, MintingSection, RoadmapSection, SocialMediaSection, TransitionSection } from '../Components'

function Home() {
  return (
    <div>
      <HeaderHome/>
      <TransitionSection/>
      <MintingSection/>
      <RoadmapSection/>
      <SocialMediaSection/>
    </div>
  )
}

export default Home