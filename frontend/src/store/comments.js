import { csrfFetch } from "./csrf";


//constants

const GET_COMMENTS = 'comments/GET_COMMENTS'

// action creator
const getComments = commets => ({
    type: GET_COMMENTS,
    commets
})
// thunks

export const getSongComments = (song) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${song.id}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(getComments(data))
        return data
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
        default:
            return state
    }
}
export default commentsReducer
