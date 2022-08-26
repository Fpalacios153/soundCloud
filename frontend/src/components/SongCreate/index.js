import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSong from './CreateSongForm.js';
import './CreateSong.css'

function CreateSongModel() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', paddingRight: '.6em' }}>
        <button className='createSong' onClick={() => setShowModal(true)}>Upload Track</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateSong />
          </Modal>
        )}
      </div>
    </>
  );
}

export default CreateSongModel;
