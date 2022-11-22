import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createComment, getSongComments } from "../../../store/comments"

export default function CommentCreate({ songId }) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([])
    useEffect(() => {
        const errors = []
        if (!comment.length) errors.push('Comment required')
        if (comment.length > 500) errors.push('Comment must not exceed 500 characters long')
        if (comment.length < 25) errors.push('Comment must be at least 25 characters')
        setValidationErrors(errors)

    }, [comment])

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (!validationErrors.length) {
            await dispatch(createComment(comment, songId))
            await setComment('')
            await setHasSubmitted(false)
        }
    }

    return (
        <div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    <ul style={{ padding: '10px', color: 'red', listStyle: 'none', textAlign: 'center' }}>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        <input
                            maxLength={501}
                            type='text'
                            placeholder="Write a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                </div>
            </form>
        </div>
    )
}
