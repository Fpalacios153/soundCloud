import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import {CreateSongg} from './CreateSongForm.js';
import './CreateSong.css'

function CreateSongModel() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signup' onClick={() => setShowModal(true)}>Upload Track</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSongg />
        </Modal>
      )}
    </>
  );
}

export default CreateSongModel;
