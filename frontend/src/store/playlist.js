import { csrfFetch } from "./csrf"

// constants
const GET_PLAYLIST = 'playlist/GET_PLAYLIST'
const GET_ONE_PLAYLIST = 'playlist/GET_ONE_PLAYLIST'

const CREATE_PLAYLIST = 'playlist/CREATE_PLAYLIST'
const ADD_SONG_PLAYLIST = 'playlist/ADD_SONG_PLAYLIST'
const UPDATE_PLAYLIST = 'playlist/UPDATE_PLAYLIST'
const DELETE_PLAYLIST = 'playlist/DELETE_PLAYLIST'
// action creator

const getPlaylist = playists => ({
    type: GET_PLAYLIST,
    playists
})
const getOne = playists => ({
    type: GET_ONE_PLAYLIST,
    playists
})
const create = playist => ({
    type: CREATE_PLAYLIST,
    playist
})
const addSong = playist => ({
    type: ADD_SONG_PLAYLIST,
    playist
})
const update = playist => ({
    type: UPDATE_PLAYLIST,
    playist
})
const deletePlay = id => ({
    type: DELETE_PLAYLIST,
    id
})


// thunks
// get users playlist
export const getUsersPlaylists = () => async dispatch => {
    const response = await csrfFetch(`/api/playlists/user`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getPlaylist(data))
        return data
    }
    return response
}
export const getOnePlaylists = (playlist) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${playlist}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getOne(data))
        return data
    }
    return response
}
export const createPlaylist = (playist) => async dispatch => {
    const response = await csrfFetch(`/api/playlists`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playist)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(create(data))
        return data
    }
    return response
}
// add song to playlist
export const addSongToPlaylist = (playist, song) => async dispatch => {
    const response = await csrfFetch(`/api/playlists${playist.id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addSong(data))
        return data
    }
    return response
}
export const editPlaylist = (playist, id) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playist)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(update(data))
        return data
    }
    return response
}

export const deletePlaylist = (id) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(deletePlay(id))
        return data
    }
    return response

}

const initialState = {}
const playlistReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PLAYLIST:
            const allplayists = {}
            action.playists.forEach(playist => {
                allplayists[playist.id] = playist
            });
            return { ...allplayists }



        case GET_ONE_PLAYLIST:

            newState = { ...state }
            newState[action.playists.id] = action.playists
            return newState





        case CREATE_PLAYLIST:
            newState = { ...state }
            newState[action.playist.id] = action.playist
            return newState
        case UPDATE_PLAYLIST:
            newState = { ...state }
            newState[action.playist.id] = action.playist
            return newState
        case DELETE_PLAYLIST:
            newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state
    }
}
export default playlistReducer
