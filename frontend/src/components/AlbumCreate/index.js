import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateAlbum from './CreateAlbumForm';

function CreateAlbumModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='album-upload' onClick={() => setShowModal(true)}>
                Upload Album
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateAlbum />
                </Modal>
            )}
        </>
    );
}

export default CreateAlbumModal;
