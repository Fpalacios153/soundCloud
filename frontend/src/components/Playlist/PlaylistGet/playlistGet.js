import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersPlaylists } from "../../../store/playlist"

export default function PlaylistGet() {
    const dispatch = useDispatch()
    const playlist = useSelector(state => state.playlist)
    const playistArr = Object.values(playlist)

    useEffect(() => {
        dispatch(getUsersPlaylists())

    }, [])
    return (
        <>
            <div>
                Playlist
                <div>
                    {playistArr.map(playlist => (
                        <div key={playlist.id}>
                            <div>{playlist.name}</div>
                            <img src={playlist.previewImage} alt={playlist.name}></img>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}
