import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOnePlaylists } from "../../../store/playlist"
import missingImage from '../../images/missingImage.png'


export default function PlaylistDetails() {
    const { playlistId } = useParams()
    const dispatch = useDispatch()
    // console.log(playlistId)

    const details = useSelector(state => state.playlist[playlistId])
    console.log(details)

    useEffect(() => {
        dispatch(getOnePlaylists(playlistId))
    }, [])

    return details ? (
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
                    {details.Songs.map(song => (
                        <ol key={song.title}>{song.title}</ol>


                    ))}

                </ul>


            </div>
        </>
    ) : null
}
