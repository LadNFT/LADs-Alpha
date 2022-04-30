import { useContext, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import Button from "./Button";
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineMinus } from 'react-icons/ai'
import Loader from "./Loader";

function TableFarmingSection() {
  const [detailItem, setDetailItem] = useState(null);
  const [detailAction, setDetailAction] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [newRate, setNewRate] = useState(0);
  const [rewardsToAdd, setRewardsToAdd] = useState(0);

  let dollarValues = {
    '0xB34cBd2821B4e2F2E1223D08A11258076746F886': 0.029,
    '0xE21585ac58f3fbC3Cb6BbAaf61c3930d15706165': 0.029,
    '0x9c3FA61ad642899Bc389ef940363301CCB43cd60': 0.029,
    '0x4a9D5084550f69922eA36BFF38b3d07e4D3Ab420': 0.029,
  }

  let titles = {
    '0xD58E8D30730A87d4eC907dfAeCa8B8708dD7e69D' : 'LAD$',
    '0x04978C2634926B6c133E6846B718AC117E10F157' : 'LAD$ - WBCH LP (Mistswap)',
    '0x48551e0b62642c564054b1ebF4aEB1F8B0675278' : 'LAD$ - WBCH LP (Benswap)',
    '0xb9C26A60E85F510223B855492afC9336Ae5A98a2' : 'LawUSD - LAD$ LP (Benswap)'
  }

  const { pools,
    poolClaimRewards,
    poolDeposit,
    poolWithdraw,
    poolSetRate,
    loading,
    poolAddRewards
  } = useContext(BlockchainContext);

  useState({
    detailItem: null,
    detailAction: null,
  });

  let getAPR = (item) => {
    var yearBlocks = (365 * 24 * 60 * 60) / 5.5;
    return Math.round(((item.rate * yearBlocks) * dollarValues[item.rewardToken]) / dollarValues[item.stakingToken] * 100000) / 1000;
  };

  const openDetails = (item) => {
    setDepositAmount(0);
    setWithdrawAmount(0);
    setDetailAction(null);
    setDetailItem(item.key);
  }

  return (
    <section className='section overflow-scroll md:overflow-hidden relative'>
      {!pools || loading ? (
        <Loader />
      ) : ''}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 relative">
          {pools && pools.map((item, index) =>
            <div className='bg-white rounded-md mb-3 h-fit' key={index}>
              {/* first table  */}
              <>
                {/* --first row -- */}
                <div className='flex flex-col justify-between items-center  py-5 px-3  shadow-sm shadow-black'>
                  <h3 className='text-2xl font-bold text-secondary text-left mb-3 w-full'>{titles[item.address]}</h3>
                  <div className='flex justify-between items-center w-full'>
                    <h3 className='text-lg md:text-xl font-normal'> Earned : </h3>
                    <h3 className='text-lg md:text-xl font-normal'> {(+item.rewards).toFixed(2)} {item.rewardSymbol} </h3>
                  </div>
                  <div className='flex justify-between items-center w-full'>
                    <h3 className='text-lg md:text-xl font-normal'>  My staked tokens : </h3>
                    <h3 className='text-lg md:text-xl font-normal'> {item.deposited} {item.stakingSymbol}</h3>
                  </div>
                  <div className='flex justify-between items-center w-full'>
                    <h3 className='text-lg md:text-xl font-normal'>  APR : </h3>
                    <h3 className='text-lg md:text-xl font-normal'>{getAPR(item)} %</h3>
                  </div>
                  <Button title="details" onClick={() => openDetails(item)} />
                </div>
              </>

              {detailItem === item.key ? (
                <div>
                  {/* --second row-- */}
                  <div className='flex justify-center items-center py-5 px-3 border-solid border-t-2 border-b-2 border-gray-300'>
                    <Button title="HARVEST" onClick={() => poolClaimRewards(item.address)} />
                    <button className='ml-5 bg-secondary p-2 rounded-md'>
                      <BsPlusLg color='white' fontSize={22} onClick={() => setDetailAction(1)} />
                    </button>
                    <button className='ml-5 bg-secondary p-2 rounded-md' onClick={() => setDetailAction(2)}>
                      <AiOutlineMinus color='white' fontSize={22} />
                    </button>
                  </div>
                </div>
              ) : ''}

              {detailItem === item.key && detailAction === 1 ? (
                <>
                  {/* --third row -- */}
                  <div className='flex flex-col justify-center items-center py-5 px-3 '>
                    <div className="flex justify-center items-center w-full mb-3">
                      <h3 className='text-xl font-normal'>{item.stakingSymbol}</h3>
                      <input onChange={(e) => setDepositAmount(e.target.value)} value={depositAmount} type="number" className='rounded-lg ml-5 bg-slate-300 p-2 w-20 border-solid border-2 border-gray-500' />
                    </div>
                    <div className="flex justify-center items-center w-full">
                      <Button title="MAX" classProps="ml-5" onClick={() => setDepositAmount(item.myBalance)} />
                      <Button title="Deposit" classProps="ml-5" onClick={() => poolDeposit(item.address, depositAmount)} />
                    </div>
                  </div>
                </>
              ) : ''}

              {detailItem === item.key && detailAction === 2 ? (
                <>
                  {/* --forth row -- */}
                  <div className='flex justify-center items-center py-5 px-3 flex-col '>
                    <div className="flex justify-center items-center w-full mb-3">
                      <h3 className='text-xl font-normal'>{item.stakingSymbol} </h3>
                      <input type="number" className='rounded-lg ml-5 bg-slate-300 p-2 w-20 border-solid border-2 border-gray-500' onChange={(e) => setWithdrawAmount(e.target.value)} value={withdrawAmount} />
                    </div>
                    <div className="flex justify-center items-center w-full">
                      <Button title="MAX" classProps="ml-5" onClick={() => setWithdrawAmount(item.deposited)} />
                      {item.locked ? (<button className="ml-5 bg-grey py-2 px-5 rounded-lg text-grey uppercase">WITHDRAW</button>) : (<Button title="WITHDRAW" classProps="ml-5" onClick={() => poolWithdraw(item.address, withdrawAmount)} />)}
                    </div>
                    {item.locked ? (<div className="flex justify-center items-center w-full">
                      Locked for {item.lockedLeft} blocks
                    </div>) : ''}
                  </div>
                </>
              ) : ''}

              {detailItem === item.key && item.owner ? (
                <>
                  {/* --second table-- */}
                  <div className='bg-white rounded-md mb-3 py-5 px-3'>
                    <h3 className='text-2xl color-gradient uppercase mb-3 font-bold'>Pool administration</h3>
                    <div className='flex  justify-between flex-col items-center py-5 px-3' >
                      <div className="flex justify-between w-full items-center mb-2">
                        <h3 className='text-lg md:text-xl font-normal'> Total stakeds : </h3>
                        <h3 className='text-md md:text-xl font-normal'>{item.totalStaked} {item.stakingSymbol}</h3>
                      </div>
                      <div className="flex justify-between w-full items-center mb-2">
                        <h3 className='text-lg md:text-xl font-normal'> Reward  pool : </h3>
                        <h3 className='text-lg md:text-xl font-normal whitespace-normal'> {(+item.rewardPool).toFixed(2)} {item.rewardSymbol}</h3>
                      </div>
                      <div className="flex justify-between w-full items-center mb-2">
                        <h3 className='text-lg md:text-xl font-normal'> Add rewardsl : </h3>
                        <h3 className='text-lg md:text-xl font-normal'> {item.rewardSymbol}$</h3>
                      </div>
                      <div className="flex justify-between w-full items-center mb-2">
                        <input onChange={(e) => setRewardsToAdd(e.target.value)} value={rewardsToAdd} type="number" className='rounded-lg bg-slate-300 p-2 mr-auto w-20 border-solid border-2 border-gray-500' />
                        <Button title="add" onClick={() => poolAddRewards(item.address, rewardsToAdd)} />
                      </div>
                      <div className="flex justify-between w-full items-center mb-2">
                        <h3 className='text-lg md:text-xl font-normal'>Set rate : </h3>
                        <h3 className='text-lg md:text-xl font-normal'>(current: {item.rate})</h3>
                      </div>
                      <div className="flex justify-between w-full items-center mb-2">
                        <input onChange={(e) => setNewRate(e.target.value)} value={newRate} type="number" className='rounded-lg bg-slate-300 p-2 w-20 border-solid border-2 border-gray-500' />
                        <Button title="Set" onClick={() => poolSetRate(item.address, newRate)} />
                      </div>
                    </div>
                  </div>
                </>
               ) : ''}  
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TableFarmingSection