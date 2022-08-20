import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import './SignupForm.css';

function SignupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create leftNav' onClick={() => setShowModal(true)}>Create Account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm path='/signup' />
        </Modal>
      )}
    </>
  );
}

export default SignupModal;
