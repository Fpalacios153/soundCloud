import { csrfFetch } from './csrf';

const LOAD_ALBUMS = 'albums/loadAlbums'
const GET_ONE_ALBUM = 'albums/getOne'
const CURRENT_USER_ALBUM = 'albums/currentUserAlbums'

const CREATE_ALBUM = 'albums/create'
const EDIT_ALBUM = 'albums/edit'

const DELETE_ALBUM = 'albums/delete'




const load = albums => ({
    type: LOAD_ALBUMS,
    albums
})
const oneAlbum = album => ({
    type: GET_ONE_ALBUM,
    album
})
const currentUserAlbums = albums => ({
    type: CURRENT_USER_ALBUM,
    albums
})
const create = album => ({
    type: CREATE_ALBUM,
    album
})
const edit = album => ({
    type: EDIT_ALBUM,
    album
})
const albumDelete = album => ({
    type: DELETE_ALBUM,
    album
})


export const getAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums')

    if (response.ok) {
        const albums = await response.json();
        dispatch(load(albums))
    }
    return response
}
export const getOneAlbum = (album) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${album.id}`)

    if (response.ok) {
        const album = await response.json();
        dispatch(oneAlbum(album))
    }
    return response
}
export const getAlbumsByCurrentUser = () => async dispatch => {
    const response = await csrfFetch('/api/albums/user')

    if (response.ok) {
        const albums = await response.json()
        dispatch(currentUserAlbums(albums))
    }
    return response
}

export const createAlbum = (album) => async dispatch => {
    const response = await csrfFetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    })

    // console.log('THUNK', response)
    if (response.ok) {
        const newAlbum = await response.json();
        dispatch(create(newAlbum))
        return newAlbum
    }
    return response
}
export const editAlbum = (album, albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    })
    if (response.ok) {
        const album = await response.json();
        dispatch(edit(album));
        return album
    }
    return response

}
export const deleteAlbum = id => async dispatch => {
    const response = await csrfFetch(`/api/albums/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const res = await response.json()
        dispatch(albumDelete(res))
    }
    return response

}

const initialState = {}
const albumReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALBUMS:
            const allAlbums = {};
            action.albums.forEach(album => {
                allAlbums[album.id] = album
            })
            return {
                ...state,
                ...allAlbums
            }
        case CURRENT_USER_ALBUM:
            // return {...state.albums,...action.albums}
            const usersAlbums = {};
            action.albums.forEach(album => {
                usersAlbums[album.id] = album
            })
            return { ...usersAlbums }
        case GET_ONE_ALBUM:
            newState = { ...state }
            newState[action.album.id] = { ...newState[action.album.id], ...action.album }
            return newState
        case CREATE_ALBUM:
            newState = { ...state }
            newState[action.album.id] = action.album
            return newState
        case EDIT_ALBUM:
            newState = { ...state }
            newState[action.album.id] = { ...newState[action.album.id], ...action.album }
            return newState
        case DELETE_ALBUM:
            newState = { ...state }
            delete newState[action.album.id]
            return newState
        default:
            return state;
    }
}


export default albumReducer
