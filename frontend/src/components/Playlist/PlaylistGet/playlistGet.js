import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUsersPlaylists } from "../../../store/playlist"
import missingImage from '../../images/missingImage.png'
import './playlistGet.css'
import CreatePlaylistModal from "../PlaylistCreate"

export default function PlaylistGet() {
    const dispatch = useDispatch()
    const playlist = useSelector(state => state.playlist)
    const playistArr = Object.values(playlist)

    useEffect(() => {
        dispatch(getUsersPlaylists())

    }, [dispatch])
    return (
        <>
            <div className="entire-playlist-container">
                <div className="playlist-top-part">
                    <h2 className="allSAtitles">
                        My Playlist
                    </h2>
                    <div className="create-playlist-button-container">
                        <CreatePlaylistModal />
                    </div>
                </div>
                {!playistArr.length ?
                    <div className='current-titles'>

                        User has no playlists
                    </div> : null}
                <div className="playlist-item-container screen-adjustment">
                    {playistArr.map(playlist => (
                        <NavLink key={playlist.id} className='remove-line' to={`/playlists/${playlist.id}`}>

                            <div className='song-tiles' key={playlist.id}>
                                <img
                                    className="playlist-image"
                                    src={playlist.previewImage}
                                    onError={e => { e.currentTarget.src = missingImage }}
                                    alt={playlist.name}
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
