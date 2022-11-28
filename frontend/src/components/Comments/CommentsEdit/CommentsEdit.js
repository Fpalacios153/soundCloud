import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateComment } from "../../../store/comments"
import './CommentsEdit.css'

export default function CommentUpdate({ commentId, setShowModal }) {
    const dispatch = useDispatch()
    const selectedComment = useSelector(state => state.comments[commentId])
    const [comment, setComment] = useState(selectedComment.body)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    useEffect(() => {
        const errors = []
        if (!comment.length) errors.push('Comment required')
        if (comment.length > 500) errors.push('Comment must not exceed 500 characters long')
        // if (comment.length < 25) errors.push('Comment must be at least 25 characters')
        setValidationErrors(errors)

    }, [comment])

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (!validationErrors.length) {
            await dispatch(updateComment(comment, commentId))
            await setShowModal(false)
        }
    }

    return (
        <div className="entire-comment-container">
            <h3 className="update-comment-title">Update Comment</h3>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    <ul style={{ padding: '10px', color: 'red', listStyle: 'none', textAlign: 'center' }}>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form className="edit-comment-form" onSubmit={onSubmit}>
                <div>
                    <label>
                        <textarea
                            className="text-area2"
                            maxLength={501}
                            type='text'
                            placeholder="Write a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                </div>
                <div className="edit-comment-button-container">
                    <button className="save-create-button" type="submit"> Save</button>
                </div>
            </form>
        </div>
    )
}
