import { Route, useParams, Redirect } from "react-router-dom";
import {useSelector} from 'react-redux'
import './SongsView.css'


function SongView() {
    const {songId} =useParams()
    const song = useSelector(state => state.songs[Number(songId)]);
    // console.log('HELLO',song)


    return (
        <>
        <h2>{song.title}</h2>
        <h3>{song.description}</h3>
        <Route path='/api/songs/:songId' exact>
        <div className="song-nav">
            <img src={song.previewImage}></img>
        </div>
        </Route>
        </>
    )
}

export default SongView
