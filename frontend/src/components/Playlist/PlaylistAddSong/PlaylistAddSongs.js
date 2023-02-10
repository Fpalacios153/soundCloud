import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSongToPlaylist, getUsersPlaylists } from "../../../store/playlist"
import CreatePlaylistModal from "../PlaylistCreate"

export default function PlaylistAddSongs({ songId, setShowModal }) {
    const dispatch = useDispatch()

    const playlists = useSelector(state => state.playlist)
    const playlistArray = Object.values(playlists)
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedPlaylist, setSelectedPlaylist] = useState('')
    useEffect(() => {
        dispatch(getUsersPlaylists()).then(() => setIsLoaded(true))
    }, [dispatch])
    const onSubmit = async (e) => {
        e.preventDefault()

        await dispatch(addSongToPlaylist(songId, selectedPlaylist))
        await setShowModal(false)


    }


    return playlists && isLoaded ? (
        <div className="add-song-playlist-container">
            <h2 className="create-album-title">Select  playlist</h2>
            <form className="add-song-playlist-container" onSubmit={onSubmit}>
                <div className="add-song-label-container">
                    {!playlistArray.length ?
                        <>
                            <div className="add-song-no-playlist-title">
                                User does not have any playlist yet, create one to add songs to a playlist
                            </div>
                            <CreatePlaylistModal />
                        </>
                        :
                        <>
                            <label>
                                <select
                                    name="rating"
                                    required
                                    value={selectedPlaylist}
                                    onChange={(e) => setSelectedPlaylist(e.target.value)}
                                    className='playlist-select'
                                >
                                    <option hidden required  >Select Playlist </option>
                                    {playlistArray.map(playlist => (
                                        <option required key={playlist.id} value={playlist.id}>{playlist.name}</option>
                                    ))}
                                </select>
                            </label>
                        </>
                    }
                </div>
                {playlistArray.length ?
                    <div className="playlist-button-container">
                        <button className="playlist-cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                        <button className="save-create-button" type="submit">Save</button>
                    </div>
                    : null
                }
            </form>

        </div>
    ) : null
}
