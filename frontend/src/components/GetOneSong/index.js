import { useParams } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import './SongsView.css'
import { useEffect  } from "react";
import { getOneSong } from "../../store/songs";


function SongView() {
    const dispatch =useDispatch()
    const {songId} =useParams()
    const song = useSelector(state => state.songs[Number(songId)]);

    useEffect(()=>{
        dispatch(getOneSong(song))
    },[dispatch, songId])

    return (
        <>
        {song && song.Artist && (<div>
        <div className="song-nav" style={{backgroundImage: `url('${song.previewImage}')`}} alt='songPic'>
        <h2>{song.title}</h2>
        <h3>{song.Artist.name}</h3>
        <h4>{song.Album.title}</h4>
        <h4>{song.url}</h4>
        </div>
        <h5>{song.description}</h5>
        </div>)
        }
        </>
    )
}

export default SongView
