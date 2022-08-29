import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { EditSong } from './EditForm';

function EditModal({ }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-model' onClick={() => setShowModal(true)}>
        <i class="fa fa-pencil" aria-hidden="true"></i>{'  '}
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong path='/song/:songId' store={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditModal;
