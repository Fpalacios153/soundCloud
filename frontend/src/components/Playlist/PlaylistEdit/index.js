import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditPlaylist from './PlaylistEdit';

function UpdatePlaylistModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Edit Playlist
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPlaylist />
                </Modal>
            )}
        </>
    );
}

export default UpdatePlaylistModal;
