import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import './SongsView.css'
import { useEffect, useState } from "react";
import { getOneSong } from "../../store/songs";
import { deleteSong } from "../../store/songs";
import EditModal from "../SongEditModal";
import AudioPlayer from "../AudioPlayer";




function SongDetails() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)


    const { songId } = useParams()
    const song = useSelector(state => state.songs[songId]);

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getOneSong(songId))
        setIsLoaded(true)

    }, [dispatch, songId])
    console.log(song)
    // console.log(song.Artist)
    const songDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSong(song.id))
        history.push('/you/library')
    };

    return (
        <>
            {isLoaded && song.Album && (<div>
                <div className="song-nav"
                    style={{ backgroundImage: `url('${song.previewImage}')` }}
                    alt='songPic'>
                    <h2>{song.title}</h2>
                    <h3>{song.Artist.name}</h3>
                    <h4>{song.Album.title}</h4>
                </div>
                <h5>{song.description}</h5>
            </div>)
            }
            {/* {song && song.Artist && sessionUser.id === song.Artist.userId && (
                <div>
                    <button onClick={songDelete}>Delete</button>
                    <EditModal />

                </div>)} */}
        </>

    )
}

export default SongDetails
