import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditAlbum from './EditAlbumForm';

function EditModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-model' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbum path='/api/album/:albumId' store={showModal} />
        </Modal>
      )}
    </>
  );
}

export default EditModal;