import React from 'react';
import demond from '../Assets/demond.png'

function DailyRevenueBox({stakedBalance = 0 , currentRate = 0  , unstakedBalance = 0  , rewardTokenBalance = 0 , stakeHandler , unstakeHandler}) {
  return (
    <div className='bg-third p-4 rounded-md border-solid border-2 border-gray-700'>
        <h2 className='text-white font-bold uppercase mb-4'>Daily Revenue</h2>
        <div className='flex justify-between items-center text-white mb-4'>
            <h4>STAKED:</h4>
            <p className='bg-primary rounded-md shadow-sm px-5 shadow-rose-500 w-24  text-center'>{stakedBalance}</p>
        </div>
        <div className='flex justify-between items-center text-white mb-4'>
            <h4>UNSTAKED:</h4>
            <p className='bg-primary rounded-md shadow-sm px-5 shadow-rose-500 w-24  text-center'>{unstakedBalance}</p>
        </div>
        <div className='flex justify-between items-center text-white mb-4'>
            <h4>RATE / BLOCK</h4>
            <p className='bg-primary rounded-md shadow-sm px-5 shadow-rose-500 w-24  text-center'>{currentRate}</p>
        </div>
        <div className='flex justify-between items-center text-white mb-4'>
            <h4>EARNING : </h4>
            <p className='rounded-md shadow-sm px-5 flex  w-24  text-center'>
                {rewardTokenBalance}
                <img src={demond} className="ml-2" alt=""/>
            </p>
        </div>

        <div className="flex justify-center items-center">
            <button className='bg-primary rounded-md text-white px-4 py-1 hover:bg-secondary  transition-color ease-in duration-300' onClick={stakeHandler} >STAKE</button>
            <button className='bg-primary rounded-md ml-4 text-white px-4 py-1 hover:bg-secondary  transition-color ease-in duration-300' onClick={unstakeHandler} >UNSTAKE</button>
        </div>
    </div>
  )
}

export default DailyRevenueBox