import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { EditSong } from './EditForm';

function EditModal({ setEdited, edited }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-model' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong path='/api/song/:songId' store={showModal} setEdited={setEdited} edited={edited} />
        </Modal>
      )}
    </>
  );
}

export default EditModal;
