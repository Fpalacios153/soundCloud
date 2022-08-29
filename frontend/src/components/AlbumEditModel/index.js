import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditAlbum from './EditAlbumForm';
import './EditAlbumForm.css'

function EditModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-model darker-border' onClick={() => setShowModal(true)}>
        <i class="fa fa-pencil" aria-hidden="true"></i> {''}
        Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbum path='/api/album/:albumId' store={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditModal;
