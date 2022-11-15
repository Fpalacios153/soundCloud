import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { deletePlaylist, getOnePlaylists } from "../../../store/playlist"
import missingImage from '../../images/missingImage.png'
import EditPlaylist from "../PlaylistEdit/PlaylistEdit"


export default function PlaylistDetails() {
    const { playlistId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log(playlistId)
    const [isLoaded, setIsLoaded] = useState(false)

    const details = useSelector(state => state.playlist[playlistId])
    console.log(details)

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
                    {details.Songs.length > 0 ?
                        (
                            details.Songs?.map(song => (
                                <ol key={song.title}>{song.title}</ol>))

                        )
                        :
                        (
                            <>
                                <div>Playlist has no songs yet</div>
                            </>
                        )
                    }
                </ul>
                <button onClick={() => toDelete(details.id)}>Delete</button>
                <EditPlaylist />

            </div>
        </>
    ) : null
}
