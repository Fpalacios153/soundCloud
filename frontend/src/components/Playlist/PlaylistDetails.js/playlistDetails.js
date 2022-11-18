import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { useSongContext } from "../../../context/setSongContext"
import { deletePlaylist, getOnePlaylists } from "../../../store/playlist"
import missingImage from '../../images/missingImage.png'
import UpdatePlaylistModal from "../PlaylistEdit"
import EditPlaylist from "../PlaylistEdit/PlaylistEdit"


export default function PlaylistDetails() {
    const { playlistId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { setSong } = useSongContext()
    const [isLoaded, setIsLoaded] = useState(false)

    const details = useSelector(state => state.playlist[playlistId])

    useEffect(() => {
        dispatch(getOnePlaylists(playlistId)).then(() => setIsLoaded(true))
    }, [dispatch, playlistId])

    const toDelete = (id) => {
        dispatch(deletePlaylist(id))
        history.push(`/you/playlists`)

    }
    return details && isLoaded ? (
        <>
            <div>
                <ul>
                    <ol>{details.name}</ol>
                    <ol>
                        <img
                            className="playlist-image"
                            src={details.previewImage}
                            alt={details.name}
                            onError={e => { e.currentTarget.src = missingImage }}
                        />
                    </ol>
                    <div>
                        <button onClick={() => toDelete(details.id)}>Delete</button>
                        <UpdatePlaylistModal />
                    </div>
                    {details.Songs.length > 0 ?
                        (details.Songs?.map((song, i) => (
                            <ul key={song.id}  >
                                <li className='song-list-points'>
                                    <div className="song-list-container">
                                        <div>
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
                                <div>Playlist has no songs yet</div>
                            </>
                        )
                    }
                </ul>
            </div>
        </>
    ) : null
}
