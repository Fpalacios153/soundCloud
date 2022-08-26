import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSong from './CreateSongForm.js';
import './CreateSong.css'

function CreateSongModel() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='createSong' onClick={() => setShowModal(true)}>Upload Track</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSong />
        </Modal>
      )}
    </>
  );
}

export default CreateSongModel;
