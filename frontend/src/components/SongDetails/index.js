import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import './SongsView.css'
import { useEffect, useState } from "react";
import { getOneSong } from "../../store/songs";
import { deleteSong } from "../../store/songs";
import EditModal from "../SongEditModal";
import { useSongContext } from "../../context/setSongContext";
import CommentsGet from "../Comments/CommentsGet/CommentsGet";
import CommentCreate from "../Comments/CommentsCreate/CommentsCreate";
import missingImage from '../images/missingImage.png'





function SongDetails() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)



    const { songId } = useParams()
    const song = useSelector(state => state.songs[songId]);

    const sessionUser = useSelector(state => state.session.user)
    const { setSong } = useSongContext()

    useEffect(() => {
        dispatch(getOneSong(songId)).then(() => setIsLoaded(true))

    }, [dispatch, songId])
    const songDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteSong(song.id))
        await setSong(null)
        await history.push('/you/songs')
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
                                            <button className='playButton' onClick={() => setSong(song)} style={{ margin: '10px' }}></button>
                                        </div >
                                        <div className="song-name-artists"                               >
                                            <h2 className="song-detail-title">{song.title}</h2>
                                            <h3 className="song-detail-name">{song.Artist.name}</h3>
                                            <Link style={{ textDecoration: 'none', color: 'white' }} to={`/albums/${song.Album.id}`}>
                                                <h4 className="song-detail-name">{song.Album.title}</h4>
                                            </Link>
                                        </div>
                                        <div style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <img src={song.previewImage} alt={song.title}
                                                onError={e => { e.currentTarget.src = missingImage }}

                                                style={{ width: '26em', height: '26em', paddingRight: '2em', paddingTop: '1.5em' }}></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CommentCreate songId={songId} />
                            {!sessionUser ? (<NavLink to='/'>Back to home page</NavLink>) :
                                song && song.Artist && sessionUser.id === song.Artist.userId && (
                                    <div className="edit-delete-song-container">
                                        <button className="delete-button" onClick={songDelete}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                            Delete
                                        </button>
                                        <EditModal />

                                    </div>)}
                            <div className="album-title-description-container">
                                <h2 className="bottom-artist-title">{song.Artist.name}</h2>
                                <div className="description-comments-container">
                                    <div className="song-album-title-container">
                                        <Link className='remove-line' to={`/albums/${song.Album.id}`}>
                                            <h3>{song.Album.title}</h3>
                                        </Link>
                                    </div>
                                    <div>
                                        <p className="description-container">{song.description}</p>
                                    </div>
                                    <CommentsGet song={song} />
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
