
import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/loadSongs'


const loadS = songs => ({
    type: LOAD_SONGS,
    songs
})



export const getSongs = () => async dispatch => {
    const response = await csrfFetch(`/api/songs`);
    console.log(response)

    if (response.ok) {
      const songs = await response.json();
      dispatch(loadS(songs));
    }
  };



  const initialState =
   {}
const songReducer = (state = initialState, action) =>{
    switch(action.type){
        case LOAD_SONGS:
        const allSongs = {};
        action.songs.Songs.forEach(song => {
            allSongs[song.id] = song
        });
        return {...state,
            ...allSongs,
        }
        default:
            return state;
    }
}


export default songReducer
