import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSongToPlaylist, getUsersPlaylists } from "../../../store/playlist"

export default function PlaylistAddSongs({ songId }) {
    const dispatch = useDispatch()

    const playlists = useSelector(state => state.playlist)
    console.log(playlists)
    const playlistArray = Object.values(playlists)
    console.log(playlistArray)
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedPlaylist, setSelectedPlaylist] = useState('')
    useEffect(() => {
        dispatch(getUsersPlaylists()).then(() => setIsLoaded(true))
    }, [])
    console.log(selectedPlaylist)
    const onSubmit = async (e) => {
        e.preventDefault()

        dispatch(addSongToPlaylist(songId, selectedPlaylist))


    }


    return playlists && isLoaded ? (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    <select name="rating"
                        required
                        value={selectedPlaylist}
                        onChange={(e) => setSelectedPlaylist(e.target.value)}
                        className='login-form-input selected-state'
                    >
                        <option hidden required  >Select Playlist </option>
                        {playlistArray.map(playlist => (
                            <option required key={playlist.id} value={playlist.id}>{playlist.name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add</button>



            </form>

        </div>
    ) : null
}
