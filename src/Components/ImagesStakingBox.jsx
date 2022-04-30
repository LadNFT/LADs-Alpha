import React from 'react';
import p3 from '../Assets/p3.png';


  const name2 = "Staked";

function ImagesStakingBox({ stakedNfts , selectStack , value }) {

    return (
        <div className='text-white bg-third py-3 mb-3'>
            <h2 className='text-center font-bold uppercase text-4xl mb-3'>Staked NFTs</h2>
            <p></p>
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-2 md:gap-16' style={{'maxHeight': '600px', 'overflow': 'scroll'}}>
                {
                    stakedNfts &&
                    stakedNfts.tokenIds.length > 0 &&
                    stakedNfts?.tokenIds.map((tokenId, i) => (
                        <button className={`flex justify-center items-center flex-col border-solid border-2 border-gray-700 rounded-md md:py-4 ${value === i ? 'border-red-400' : ''}`} key={i} onClick={() => selectStack(i , tokenId)}>
                            <img src={stakedNfts.metadatas[i]} alt="" className='md:w-1/2 mb-3' />
                            <h4 className='mb-3' >Token ID {tokenId}</h4>
                            <h5 className='mb-3' > {name2.toUpperCase()}</h5>
                        </button>
                    )
                )}

            </div>
        </div>
    )
}

export default ImagesStakingBox