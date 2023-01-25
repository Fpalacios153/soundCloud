
import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/loadSongs'
const GET_ONE_SONG = 'songs/getOne'
const CREATE_SONGS = 'songs/createSongs'
const EDIT_SONG = 'songs/editSongs'
const REMOVE_SONG = 'songs/removeSong'

const CURRENT_USER_SONG = 'songs/currentUserSong'

const loadS = songs => ({
    type: LOAD_SONGS,
    songs
})
const oneSong = song => ({
    type: GET_ONE_SONG,
    song
})
const currUserSongs = songs => ({
    type: CURRENT_USER_SONG,
    songs
})
const create = song => ({
    type: CREATE_SONGS,
    song
})
const edit = song => ({
    type: EDIT_SONG,
    song
})

const remove = song => ({
    type: REMOVE_SONG,
    song
})

//get all songs
export const getSongs = () => async dispatch => {
    const response = await csrfFetch(`/api/songs`);

    if (response.ok) {
        const songs = await response.json();
        dispatch(loadS(songs));
    }
    return response
};
//get one song
export const getOneSong = (songId) => async dispatch => {
    // if (!song) return

    const response = await csrfFetch(`/api/songs/${songId}`)

    if (response.ok) {
        const song = await response.json();
        dispatch(oneSong(song))
    }
    return response

};
//get song by current user
export const getSongByCurrentUser = () => async dispatch => {
    const response = await csrfFetch(`/api/songs/user`)

    if (response.ok) {
        const songs = await (response.json())
        dispatch(currUserSongs(songs))
    }

    return response

}
//create songs
export const createSong = (song, albumId) => async dispatch => {
    const { title, description, url, previewImage } = song

    const formData = new FormData()

    formData.append("title", title)
    formData.append("description", description)

    if (url) formData.append("audioAndImage", url);
    if (previewImage) formData.append("audioAndImage", previewImage)

    // if (images && images.length !== 0) {
    //     for (var i = 0; i < images.length; i++) {
    //         formData.append("image", images[i]);
    //         // formData.append("image", images[1]);
    //     }

    // }
    const response = await csrfFetch(`/api/songs/${albumId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })

    if (response.ok) {
        const song = await response.json();
        dispatch(create(song));
        return song
    }
    return response

}
//Edit a song
export const editSong = (song, songId) => async dispatch => {
    const { title, description, url, previewImage } = song

    const formData = new FormData()

    formData.append("title", title)
    formData.append("description", description)

    if (url) formData.append("audioAndImage", url);
    if (previewImage) formData.append("audioAndImage", previewImage)

    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    })
    if (response.ok) {
        const song = await response.json();
        dispatch(edit(song));
        return song
    }
    return response

}
export const deleteSong = (id) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const res = await response.json()
        dispatch(remove(res))
    }
    return response
}


const initialState = {}
const songReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_SONGS:
            const allSongs = {};
            action.songs.forEach(song => {
                allSongs[song.id] = song
            });
            return {
                ...state,
                ...allSongs,
            }
        case CURRENT_USER_SONG:
            const UsersSongs = {};
            action.songs.forEach(song => {
                UsersSongs[song.id] = song
            });
            return {
                ...UsersSongs,
            }
        case GET_ONE_SONG:
            newState = { ...state }
            newState[action.song.id] = { ...newState[action.song.id], ...action.song }
            return newState
        case CREATE_SONGS:
            newState = { ...state }
            newState[action.song.id] = action.song
            return newState
        case EDIT_SONG:
            newState = { ...state }
            newState[action.song.id] = { ...newState[action.song.id], ...action.song }
            return newState
        case REMOVE_SONG:
            newState = { ...state }
            delete newState[action.song.id]
            return newState
        default:
            return state;
    }
}


export default songReducer
