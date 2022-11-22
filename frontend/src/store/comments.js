import { csrfFetch } from "./csrf";


//constants

const GET_COMMENTS = 'comments/GET_COMMENTS'
const CREATE_COMMENTS = 'comments/CREATE_COMMENTS'
const UPDATE_COMMENTS = 'comments/UPDATE_COMMENTS'
const DELETE_COMMENTS = 'comments/DELETE_COMMENTS'

// action creator
const getComments = comments => ({
    type: GET_COMMENTS,
    comments
})
const createCom = comment => ({
    type: CREATE_COMMENTS,
    comment
})
const updateCom = comment => ({
    type: UPDATE_COMMENTS,
    comment
})
const deleteCom = commentId => ({
    type: DELETE_COMMENTS,
    commentId
})
// thunks

export const getSongComments = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${songId}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getComments(data))
        return data
    }
    return response
}
export const createComment = (body, songId) => async dispatch => {
    console.log(body)
    const response = await csrfFetch(`/api/comments/${songId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body })
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(createCom(data))
        return data
    }
    return response
}
export const updateComment = (body, commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body })
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(createCom(data))
        return data
    }
    return response
}
export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const res = await response.json()
        dispatch(deleteCom(commentId))
        return res
    }
    return response
}
//reducer

const initialState = {}
const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            const comments = {}
            action.comments.forEach(com => {
                comments[com.id] = com
            });
            return { ...comments }
        case CREATE_COMMENTS:
            newState = { ...state }
            newState[action.comment.id] = action.comment
            return newState
        case DELETE_COMMENTS:
            newState = { ...state }
            delete newState[action.commentId]
            return newState
        default:
            return state
    }
}
export default commentsReducer
