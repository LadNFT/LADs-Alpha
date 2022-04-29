import React, { useState } from 'react'
import Button from './Button';
import Modal from './Modal'

function BtnReward() {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className='text-center mb-5'>
        <Button title='WITHDRAW REWARDS' onClick={() => setShowModal(true)} />
        {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
    </header>
  )
}

export default BtnReward