import React, { useState } from 'react';
import p3 from '../Assets/p3.png';


const name = "UnStaked";

function ImagesUnStakingBox({ unstakedNfts,  selectStack , value }) {
   
    return (
        <div className='text-white bg-third py-3 mb-3'>
            <h2 className='text-center font-bold uppercase text-4xl mb-5'>Unstaked NFTs</h2>
            <p></p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-16'>
                {
                    unstakedNfts &&
                    unstakedNfts.tokenIds.length > 0 &&
                    unstakedNfts?.tokenIds.map((tokenId, i) => (
                        <button className={`flex justify-center items-center flex-col border-solid border-2 border-gray-700 rounded-md md:py-4 ${value === i ? 'border-red-400' : ''}`} 
                        key={i} onClick={() => selectStack(i , tokenId)}>
                            <img src={unstakedNfts.metadatas[i]} alt="" className='md:w-1/2 mb-3' />
                            <h4 className='mb-3' >Token ID {tokenId}</h4>
                            <h5 className='mb-3' > {name.toUpperCase()}</h5>
                        </button>
                    )
                )}

                {/* <button className={`flex justify-center items-center flex-col border-solid border-2 border-gray-700 rounded-md md:py-4  ${value === 0 ? 'border-red-400' : ''}`} >
                    <img src={p3} alt="" className='md:w-1/2 mb-3' />
                    <h4 className='mb-3' >Token ID </h4>
                    <h5 className='mb-3' > yyyyy</h5>
                </button>

                <button className={`flex justify-center items-center flex-col border-solid border-2 border-gray-700 rounded-md md:py-4  ${value === 1 ? 'border-red-400' : ''}`} >
                    <img src={p3} alt="" className='md:w-1/2 mb-3' />
                    <h4 className='mb-3' >Token ID </h4>
                    <h5 className='mb-3' > yyyyy</h5>
                </button> */}

            </div>
        </div>
    )
}

export default ImagesUnStakingBox