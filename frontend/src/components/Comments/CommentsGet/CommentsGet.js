import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteComment, getSongComments } from "../../../store/comments"
import UpdateCommentModal from "../CommentsEdit"
import './CommentsGet.css'

export default function CommentsGet({ song }) {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const comments = useSelector(state => state.comments)
    const currentUser = useSelector(state => state.session.user)
    const commentsArr = Object.values(comments).reverse()

    useEffect(() => {
        dispatch(getSongComments(song.id)).then(() => setIsLoaded(true))
    }, [])

    const numberOfComments = commentsArr.length + 1

    const changeDate = (data) => {
        const date = new Date(data)
        const dateString = date.toLocaleDateString()
        const hours = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return (
            <>
                <div>
                    {dateString}
                </div>
                <div>
                    {hours}
                </div>
            </>)
    }
    const toDelete = (commentId) => {
        dispatch(deleteComment(commentId))

    }

    return isLoaded ? (
        <div className="entire-comments-container">
            <div>
                <h3 className="comments-title-container">
                    <i className="fa fa-comment" aria-hidden="true"></i>
                    {` ${numberOfComments} Comments`}
                </h3>
            </div>
            {commentsArr.map(comment => (

                <div key={comment.id} className='comments-container-item'>
                    <div className="test-circle"></div>
                    <div className="username-body-container">
                        <div>{comment.User.username}</div>
                        <div>{comment.body}</div>
                    </div>

                    <div className="comments-time-button-container">


                        {changeDate(comment.createdAt)}

                        {currentUser.id === comment.userId ? (

                            <>
                                <div>
                                    <UpdateCommentModal commentId={comment.id} />
                                    <button
                                        className="delete-update-comment-button"
                                        onClick={() => toDelete(comment.id)}>
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </>
                        ) : null
                        }
                    </div>
                </div>
            ))}
        </div>
    ) : null
}
