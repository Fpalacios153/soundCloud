import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signup bottom' onClick={() => setShowModal(true)}>Sign in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm path='/discover' />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
