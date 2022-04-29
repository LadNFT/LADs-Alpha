
import React, { useCallback, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BlockchainContext } from '../context/BlockchainContext';

function Toaster() {
    const {errorDetails} = useContext(BlockchainContext)


    const displayToast = useCallback(() => {
        if (errorDetails.length > 0) {
            toast.info(errorDetails , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }   
    }, [errorDetails]) 

    useEffect(() => {
        displayToast()
    }, [displayToast])
    

    return (
        <div>           
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
        </div>
    );
}

export default Toaster