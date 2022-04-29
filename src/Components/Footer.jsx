import React from 'react';
import HomeIcon from '../Assets/1.png';
import DocumentIcon from '../Assets/2.png';
import ShopIcon from '../Assets/3.png';
import ImgIcon from './ImgIcon';

function Footer() {

    const footerDetails = [
        {
            src: HomeIcon,
            link: 'header',
            smallImg: true,
            sectionLink:true,
        },
        {
            src: DocumentIcon,
            link: 'https://docs.google.com/forms/d/e/1FAIpQLScXLOAsY0amAVPLCM9ck55qtahcY3IVRDgB7G1Lgd1Ep95qZQ/closedform',
            smallImg: true
        },
        {
            src: ShopIcon,
            link: 'https://oasis.cash/collection/0x62587576142bd5b73F71d6DA51389Fb6b92216AE/',
            smallImg: true
        },
    ]

    

    return (
        <footer className='bg-third p-4 mt-auto'>
            <div className="container">
                <div className="flex items-center justify-center">
                    {
                        footerDetails.map((item, index) => (
                            <ImgIcon item={item} key={index} />
                        ))
                    }
                </div>
                <p className='text-center text-gray-500 mt-4'>© 2022 Present Lads</p>
            </div>
        </footer>
    )
}

export default Footer