import { Link, NavLink, useHistory, useParams } from "react-router-dom";
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
    console.log('SONG AFTER CREATED', song)

    const sessionUser = useSelector(state => state.session.user)
    const { setSong } = useSongContext()

    useEffect(() => {
        dispatch(getOneSong(songId)).then(() => setIsLoaded(true))

    }, [dispatch, songId])
    const songDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSong(song.id))
        history.push('/you/library')
    };
    // if (!song && song.Artist) return null

    return (
        <>
            <div className="detail-container">
                <div className="song-detail-container">
                    {(song.Artist &&
                        <div className="song-info-container">
                            <div className="song-background" style={{ backgroundColor: 'grey' }} alt='songPic'>
                                <div>
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', paddingTop: '10px', justifyContent: 'space-between' }}>
                                        <div>
                                            <button className='playButton' onClick={() => setSong(song.url)} style={{ margin: '10px' }}></button>
                                        </div >
                                        <div className="song-name-artists"                               >
                                            <h2 className="song-detail-title">{song.title}</h2>
                                            <h3 className="song-detail-name">{song.Artist.name}</h3>
                                            <Link style={{ textDecoration: 'none', color: 'white' }} to={`/api/albums/${song.Album.id}`}>
                                                <h4 className="song-detail-name">{song.Album.title}</h4>
                                            </Link>
                                        </div>
                                        <div style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <img src={song.previewImage} alt={song.title} style={{ width: '26em', height: '26em', paddingRight: '2em', paddingTop: '1.5em' }}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!sessionUser ? (<NavLink to='/'>Back to home page</NavLink>) :
                                song && song.Artist && sessionUser.id === song.Artist.userId && (
                                    <div>
                                        <button className="delete-button" onClick={songDelete}>Delete</button>
                                        <EditModal />

                                    </div>)}
                            <div style={{ display: 'flex', justifyContent: "start", width: '65%' }}>
                                <h2 style={{ padding: '0px 10px' }}>{song.Artist.name}</h2>
                                <div>
                                    <Link className='remove-line' to={`/api/albums/${song.Album.id}`}>
                                        <h3 style={{ paddingLeft: '2.5em' }}>{song.Album.title}</h3>
                                    </Link>
                                    <p style={{ paddingLeft: '3em', flexWrap: 'wrap' }}>{song.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>

    )
}

export default SongDetails
