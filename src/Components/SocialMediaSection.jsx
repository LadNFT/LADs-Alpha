import React from 'react';
import TwitterImg from '../Assets/twitter_btn.png'
import MistswapImg from '../Assets/mistswap_DEX.png'
import TelegramImg from '../Assets/telegram_btn.png'
import ImgIcon from './ImgIcon';


function SocialMediaSection() {

    const socialMediaDetails = [
        {
            src: TwitterImg,
            link: 'https://twitter.com/LadNFTs'
        },
        {
            src: MistswapImg,
            link: 'https://app.mistswap.fi/swap?inputCurrency=0xB34cBd2821B4e2F2E1223D08A11258076746F886'
        },
        {
            src: TelegramImg,
            link: 'https://t.me/ladsnft'
        },
    ]

    return (
        <section className='section'>
            <div className="container">
                {/* --loop at scoical media links -- */}
                <div className="flex items-center justify-center lg:justify-between flex-wrap content-center">
                    {
                        socialMediaDetails.map((item, index) => (
                           <ImgIcon item={item} key={index} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default SocialMediaSection