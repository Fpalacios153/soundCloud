import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css'

function LoginFormModal({ whichLogin }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={whichLogin ? 'signup' : 'signup-bottom'} onClick={() => setShowModal(true)}>Sign in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm path='/discover' />
        </Modal>
      )}
    </>
  )

}

export default LoginFormModal;
