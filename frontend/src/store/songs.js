
import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/loadSongs'
const GET_ONE_SONG ='songs/getOne'
const CREATE_SONGS ='songs/createSongs'


const loadS = songs => ({
    type: LOAD_SONGS,
    songs
})
const oneSong = song => ({
    type: GET_ONE_SONG,
    song
})
const create = songs => ({
    type: CREATE_SONGS,
    songs
})



export const getSongs = () => async dispatch => {
    const response = await csrfFetch(`/api/songs`);

    if (response.ok) {
      const songs = await response.json();
      dispatch(loadS(songs));
    }
  };

export const getOneSong =  (song) => async dispatch =>{
    const response = await csrfFetch(`/api/songs/${song.id}`)

    if(response.ok) {
        const song = await response.json();
        dispatch(oneSong(song))
    }
  };
// export const getSongByCurrentUser =(songs) => async dispatch => {
//     const response = await csrfFetch(`/api/songs/user`)

//     if(response.ok){
//         const songs = await(songs)
//         dispatch()
//     }
// }

export const createSong = (song) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${2}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(song)
    })
    if (response.ok) {
        const song = await response.json();
        dispatch(create(song));
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
        case GET_ONE_SONG:
            newState = {...state}
            newState[action.song.id] = action.song
            return newState
        case CREATE_SONGS:
            newState = {...state}
                newState[action.song.id] = action.song
            return newState
        default:
            return state;
    }
}


export default songReducer
