import { csrfFetch } from './csrf';

const LOAD_ALBUMS ='albums/loadAlbums'
const GET_ONE_ALBUM ='albums/getOne'



const load = albums =>({
    type: LOAD_ALBUMS,
    albums
})
const oneAlbum = album => ({
    type: GET_ONE_ALBUM,
    album
})

export const getAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/albums')

    if(response.ok){
        const albums = await response.json();
        dispatch(load(albums))
    }
}
export const getOneAlbum = (album) => async dispatch =>{
    const response = await csrfFetch(`/api/albums/${album.id}`)

    if(response.ok){
        const album = await response.json();
        dispatch(oneAlbum(album))
    }
    return response
}

const initialState = {}
const albumReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_ALBUMS:
            const allAlbums = {};
            action.albums.forEach(album => {
                allAlbums[album.id] = album
            })
            return {...state,
            ...allAlbums
        }
        case GET_ONE_ALBUM:
            newState = {...state}
            newState[action.album.id] =action.album
            return newState
        default:
            return state;
    }
}


export default albumReducer
