
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
// import './CreateSong.css'
import PlaylistAddSongs from './PlaylistAddSongs';

function AddSongToPlaylistModal({ songId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingRight: '.6em' }}>
                <button className='createSong' onClick={() => setShowModal(true)}>Add Song To a playlist</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <PlaylistAddSongs songId={songId} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default AddSongToPlaylistModal;
