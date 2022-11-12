import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUsersPlaylists } from "../../../store/playlist"
import missingImage from '../../images/missingImage.png'
import './playlistGet.css'

export default function PlaylistGet() {
    const dispatch = useDispatch()
    const playlist = useSelector(state => state.playlist)
    const playistArr = Object.values(playlist)

    useEffect(() => {
        dispatch(getUsersPlaylists())

    }, [])
    return (
        <>
            <div className="entire-playlist-container">
                <h1>
                    My Playlist
                </h1>
                <div className="playlist-item-container">
                    {playistArr.map(playlist => (
                        <NavLink className='remove-line' to={`/playlists/${playlist.id}`}>

                            <div className='playlist-container' key={playlist.id}>
                                <img
                                    className="playlist-image"
                                    src={playlist.previewImage}
                                    alt={playlist.name}
                                    onError={e => { e.currentTarget.src = missingImage }}
                                />
                                <div className="overflow-title-div ">{playlist.name}</div>
                            </div>
                        </NavLink>
                    ))}

                </div>
            </div>
        </>
    )
}
