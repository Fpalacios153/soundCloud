import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment, getSongComments } from "../../../store/comments"
import UpdateCommentModal from "../CommentsEdit"

export default function CommentsGet({ song }) {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const comments = useSelector(state => state.comments)
    const currentUser = useSelector(state => state.session.user)
    const commentsArr = Object.values(comments).reverse()

    useEffect(() => {
        dispatch(getSongComments(song.id)).then(() => setIsLoaded(true))
    }, [])



    const changeDate = (data) => {
        const date = new Date(data)
        const dateString = date.toLocaleDateString()
        const hours = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return dateString + ' ' + hours
    }
    const toDelete = (commentId) => {
        dispatch(deleteComment(commentId))

    }

    return isLoaded ? (
        <div>
            {commentsArr.map(comment => (

                <div key={comment.id}>
                    <div>{comment.User.username}</div>
                    <div>{comment.body}</div>
                    <div>{changeDate(comment.createdAt)}</div>
                    {currentUser.id === comment.userId ? (
                        <>
                            <UpdateCommentModal commentId={comment.id} />
                            <button
                                // className="delete-button"
                                onClick={() => toDelete(comment.id)}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </>
                    ) : null
                    }
                </div>
            ))}
        </div>
    ) : null
}
