import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CommentUpdate from './CommentsEdit';

function UpdateCommentModal({ commentId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='delete-update-comment-button' onClick={() => setShowModal(true)}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentUpdate commentId={commentId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default UpdateCommentModal;
