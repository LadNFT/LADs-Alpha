import React, { useState, useContext } from 'react';
import Logo from '../Assets/logo.png'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdOutlineClose } from 'react-icons/md'
import { AiOutlineHome , AiFillBank , AiFillFire , AiFillTrophy } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { HOME_PATH, STAKING_PATH, ENDLESS_PATH, FARMING_PATH } from '../utiles/routes'
import NavbarLink from './NavbarLink';
import { BlockchainContext } from '../context/BlockchainContext';
import Button from './Button';


function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    let navigate = useNavigate();
    const { connectWallet, connectedAccount } = useContext(BlockchainContext);


    // make address wallet small 
    const shorterAddress = (address) => (`${address.slice(0, 5)}...${address.slice(address.length - 4)}`);

    const goToPage = (path) => {
        navigate(path)
        setToggleMenu(false)
    }

    // link details 
    const linksDetails = [
        { title: 'Home', path: HOME_PATH , icon:<AiOutlineHome fontSize={22} color={'rgb(150, 32, 107)'} /> },
        { title: 'Staking', path: STAKING_PATH , icon:<AiFillBank fontSize={22} color={'rgb(150, 32, 107)'}  /> },
        { title: 'Farming', path: FARMING_PATH , icon:<AiFillFire fontSize={22} color={'rgb(150,32, 107)'}/> },
        { title: 'Endless Possibilities', path: ENDLESS_PATH ,icon:<AiFillTrophy fontSize={22} color={'rgb(150,32, 107)'}/> },
    ]

    return (
        <div className="container">
            <div className='flex justify-between items-center w-full text-center mt-4'>
                {/* --logo-- */}
                <div className='flex-1 mt-1'>
                    <Link to='/'>
                        <img src={Logo} alt="logo" />
                    </Link>
                </div>
                {/* --items -- */}
                <ul className='items-center justify-center hidden lg:flex '>
                    {linksDetails.map((item, index) => (
                        <NavbarLink
                            title={item.title}
                            path={item.path}
                            key={index}
                            goToPage={goToPage}
                            classProps="mr-5" />
                    ))}
                </ul>
                {/* --btn-- */}
                {connectedAccount.length > 0 ? (
                    <div className='flex-1 hidden lg:flex md:justify-end md:flex items-center'>
                        <h4 className='mr-3 text-white'>HI {shorterAddress(connectedAccount)} </h4>
                    </div>
                ) : (
                    <div className='flex-1 hidden lg:flex md:justify-end'>
                        <Button title='connect wallet' onClick={connectWallet} />
                    </div>
                )}

                {/*--toggle menu --*/}
                <div className="flex relative">
                    <HiMenuAlt4 fontSize={28} className="text-white cursor-pointer lg:hidden" onClick={() => setToggleMenu(true)} />
                    {
                        toggleMenu && (
                            <div className='flex justify-between -mt-3'>
                                <li className='z-50 text-xl w-full my-2 list-none'>
                                    <MdOutlineClose fontSize={28} color="white" className="z-10 lg:hidden " onClick={() => setToggleMenu(false)} />
                                </li>
                                <ul className='navlist-mobile'>
                                    {linksDetails.map((item, index) => (
                                        <NavbarLink
                                            title={item.title}
                                            path={item.path}
                                            key={index}
                                            goToPage={goToPage}
                                            classProps="my-4 text-lg"
                                            icon={item.icon}
                                        />
                                    ))}
                                    <li>
                                        {/* --btn-- */}
                                        {connectedAccount.length > 0 ? (
                                            <div className='flex-1 lg:flex md:justify-end flex items-center mt-5'>
                                                <h4 className='mr-3 text-white'>HI {shorterAddress(connectedAccount)} </h4>
                                            </div>
                                        ) : (
                                            <div className='flex-1  lg:flex md:justify-end mt-5'>
                                                <Button title='connect wallet' onClick={connectWallet} />
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Navbar;