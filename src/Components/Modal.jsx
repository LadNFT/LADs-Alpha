import React, { useContext } from "react";
import { MdOutlineClose } from 'react-icons/md'
import { BlockchainContext } from "../context/BlockchainContext";

const Modal = ({showModal, setShowModal}) => {
    const { rewardTokenBalance, withdrawToERC20 } = useContext(BlockchainContext);

    const withdrawToErc20Handler = () => {
        withdrawToERC20();
    };

    return (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto bg-[rgba(0,0,0,0.4)] fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-auto my-6 mx-auto max-w-3xl text-white animate-scale-in container">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#16436a] outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                            <h3 className="text-2xl ">CLAIM REWARDS</h3>
                            <button
                                className="bg-transparent border-0 mt-1 float-right"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="">
                                    <MdOutlineClose color="white" fontSize={22} />
                                </span>
                            </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                <label className="block text-black text-lg font-bold mb-1">
                                    Your Balance
                                </label>
                                <input className="shadow appearance-none border  w-full rounded-md py-2 px-1 text-black" type='number' value={rewardTokenBalance} onChange={(e) => { }} />
                                <p className="text-black mt-3" >Your reward balance of all staked tokens avalible to withdraw</p>
                            </form>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="text-white bg-gradient-to-r from-primary to-secondary font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={withdrawToErc20Handler}
                            >
                                WITHDRAW TO $LADS
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Modal;