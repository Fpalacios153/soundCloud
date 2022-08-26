import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditAlbum from './EditAlbumForm';

function EditModal({ setEdited, edited }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-model' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbum path='/api/album/:albumId' store={showModal} setEdited={setEdited} edited={edited} />
        </Modal>
      )}
    </>
  );
}

export default EditModal;
