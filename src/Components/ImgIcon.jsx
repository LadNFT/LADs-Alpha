import React from 'react'
import { goToLinkOutside, goToSection } from '../utiles/functions'

function ImgIcon({item}) {
    return (
        <button onClick={() =>  item.sectionLink ? goToSection(item.link) : goToLinkOutside(item.link)}>
            <img src={item.src} className={`${item.smallImg ? 'w-1/2 m-auto':''} `} alt="" />
        </button>
    )
}

export default ImgIcon