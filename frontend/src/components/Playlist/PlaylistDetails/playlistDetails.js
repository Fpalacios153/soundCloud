import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { useSongContext } from "../../../context/setSongContext"
import { deletePlaylist, getOnePlaylists } from "../../../store/playlist"
import missingImage from '../../images/missingImage.png'
import UpdatePlaylistModal from "../PlaylistEdit"
import './playlistDetail.css'



export default function PlaylistDetails() {
    const { playlistId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { setSong } = useSongContext()
    // const [isLoaded, setIsLoaded] = useState(false)

    const details = useSelector(state => state.playlist[playlistId])

    useEffect(() => {
        dispatch(getOnePlaylists(playlistId))
        // .then(() => setIsLoaded(true))
    }, [dispatch, playlistId])

    const toDelete = (id) => {
        dispatch(deletePlaylist(id))
        history.push(`/you/playlists`)
        // setSong('')

    }
    return details ? (
        <>
            <div className="detail-container">
                <div className="album-background">
                    <div className="top-part-playist-container">
                        <div className="left-side-playlist">
                            <h1 className="album-detail-title">{details.name}</h1>
                            <h2 className="song-count-circle"> {details.Songs.length} songs</h2>
                        </div>
                        <div className="right-side-playlist">
                            <img
                                className="playlist-image-details"
                                src={details.previewImage}
                                alt={details.name}
                                onError={e => { e.currentTarget.src = missingImage }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <button className="delete-button darker-border" onClick={() => toDelete(details.id)}>Delete</button>
                        <UpdatePlaylistModal />
                    </div>
                    <div className="playlist-details-song-container">

                        {details.Songs.length > 0 ?
                            (details.Songs.map((song, i) => (
                                <ul key={song.id}  >
                                    <li className='song-list-points border-top'>
                                        <div className="song-list-container">
                                            <div className="song-button-img-container">
                                                <button className="small-button" onClick={() => setSong(song)}></button>
                                                <img style={{ height: '2.8em', width: '2.8em', padding: '1px' }} src={song.previewImage} alt={song.title} />
                                            </div>
                                            <Link className='link-to-song' to={`/songs/${song.id}`} >
                                                <div className="centered">{`${i + 1}  `}</div>
                                                <div className="centered small-title">{song.title}</div>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            )))

                            :
                            (
                                <>
                                    <div className="current-titles">Playlist has no songs yet</div>
                                </>
                            )
                        }
                    </div>

                </div>
            </div>
        </>
    ) : null
}
