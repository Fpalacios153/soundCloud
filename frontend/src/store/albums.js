import { csrfFetch } from './csrf';

const LOAD_ALBUMS ='albums/loadAlbums'


const load = albums =>({
    type: LOAD_ALBUMS,
    albums
})

export const getAlbums = () => async dispatch => {
    const response = await csrfFetch('/api/album')

    if(response.ok){
        const albums = await response.json();
        dispatch(load(albums))
    }
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
        default:
            return state;
    }
}


export default albumReducer
