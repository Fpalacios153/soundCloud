
import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/loadSongs'
const GET_ONE_SONG ='songs/getOne'
const CURRENT_USER_SONG = 'songs/currentUserSong'
const CREATE_SONGS ='songs/createSongs'
const REMOVE_SONG ='songs/removeSong'


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
const create = songs => ({
    type: CREATE_SONGS,
    songs
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
  };
//get one song
export const getOneSong =  (song) => async dispatch =>{
    const response = await csrfFetch(`/api/songs/${song.id}`)

    if(response.ok) {
        const song = await response.json();
        dispatch(oneSong(song))
    }
  };
  //get song by current user
export const getSongByCurrentUser =() => async dispatch => {
    const response = await csrfFetch(`/api/songs/user`)

    if(response.ok){
        const songs = await(response.json())
        dispatch(currUserSongs(songs))
    }
}
//create songs
export const createSong = (song, albumId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${2}`, { ////come back to this!!!
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const song = await response.json();
        dispatch(create(song));
      }
}
//Edit a song
export const editSong = (song, songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const song = await response.json();
        dispatch(create(song));
        return song
      }
      return response

}
export const deleteSong =(id) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}`,{
        method:'DELETE'
    })

    if(response.ok){
        const res = await response.json()
        dispatch(remove(res))
    }

}


  const initialState = {}
const songReducer = (state = initialState, action) =>{
    let newState
    switch(action.type){
        case LOAD_SONGS:
        const allSongs = {};
        action.songs.Songs.forEach(song => {
            allSongs[song.id] = song
        });
        return {...state,
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
            newState = {...state}
            newState[action.song.id] = action.song
            return newState
        case CREATE_SONGS:
            newState = {...state}
                newState[action.song.id] = action.song
            return newState
        case REMOVE_SONG:
            newState={...state}
            delete newState[action.song.id]
                return newState
        default:
            return state;
    }
}


export default songReducer
