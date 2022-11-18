import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreatePlaylist from './playlistCreate';
import './PlaylistCreate.css'

function CreatePlaylistModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='album-upload create-playlist-button' onClick={() => setShowModal(true)}>
                Create a New Playlist Here
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePlaylist />
                </Modal>
            )}
        </>
    );
}

export default CreatePlaylistModal;
