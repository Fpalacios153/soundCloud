
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
// import './CreateSong.css'
import PlaylistAddSongs from './PlaylistAddSongs';

function AddSongToPlaylistModal({ songId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='song-button-add' style={{ display: 'flex', alignItems: 'flex-end', paddingRight: '.6em' }}>
                <button className='createSong' onClick={() => setShowModal(true)}>+</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <PlaylistAddSongs songId={songId} setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default AddSongToPlaylistModal;
