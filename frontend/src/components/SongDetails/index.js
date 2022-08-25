import { NavLink, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import './SongsView.css'
import { useEffect, useState } from "react";
import { getOneSong } from "../../store/songs";
import { deleteSong } from "../../store/songs";
import EditModal from "../SongEditModal";
import { useSongContext } from "../../context/setSongContext";




function SongDetails() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)



    const { songId } = useParams()
    const song = useSelector(state => state.songs[songId]);

    const sessionUser = useSelector(state => state.session.user)
    const { setSong } = useSongContext()

    useEffect(() => {
        dispatch(getOneSong(songId))
        setIsLoaded(true)

    }, [dispatch,])
    console.log(song)
    // console.log(song.Artist)
    const songDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSong(song.id))
        history.push('/you/library')
    };

    return (
        <>
            <div className="detail-container">
                <div className="song-detail-container">
                    {isLoaded && song.Album && (
                        <div className="song-info-container">
                            <div className="song-background" style={{ backgroundColor: 'grey' }} alt='songPic'>
                                <div style={{ width: '60%', display: 'flex', paddingTop: '10px' }}>
                                    <div>
                                        <button className='playButton' onClick={() => setSong(song.url)} style={{ margin: '10px' }}>PLAY</button>
                                    </div >
                                    <div className="song-name-artists"                               >
                                        <h2 className="song-detail-title">{song.title}</h2>
                                        <h3 className="song-detail-name">{song.Artist.name}</h3>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <img src={song.previewImage} alt={song.title} style={{ width: '20em', height: '20em', }}></img>

                                    </div>
                                </div>
                            </div>
                            {!sessionUser ? (<NavLink to='/'>Back to home page</NavLink>) :
                                song && song.Artist && sessionUser.id === song.Artist.userId && (
                                    <div>
                                        <button onClick={songDelete}>Delete</button>
                                        <EditModal />

                                    </div>)}
                            <div style={{ display: 'flex', justifyContent: "start", width: '75%' }}>
                                <h2 style={{ padding: '0px 10px' }}>{song.Artist.name}</h2>
                                <p style={{ paddingLeft: '3em', flexWrap: 'wrap' }}>{song.description}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>

        </>

    )
}

export default SongDetails
