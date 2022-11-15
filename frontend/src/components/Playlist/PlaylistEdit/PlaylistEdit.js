import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPlaylist, getOnePlaylists } from "../../../store/playlist";

export default function EditPlaylist({ setShowModal }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { playlistId } = useParams()
    const playlistToBeEdited = useSelector(state => state.playlist[playlistId])
    const [name, setName] = useState(playlistToBeEdited.name)
    const [imageUrl, setPreviewImage] = useState(playlistToBeEdited.previewImage)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([[]])


    useEffect(() => {
        const errors = []
        if (!name.length) errors.push('Name required')
        if (!imageUrl.includes('.png') && !imageUrl.includes('.jpeg') && !imageUrl.includes('.jpg')) errors.push('Image must be in jpeg, jpg or png format')
        setValidationErrors(errors)
    }, [name, imageUrl])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)


        const playlist = {
            name,
            imageUrl
        }
        // console.log(playlist.id)
        if (!validationErrors.length) {
            let editedPlaylist = await (dispatch(editPlaylist(playlist, playlistId)))
            if (editedPlaylist) {
                // setShowModal(false)
                // dispatch(getOnePlaylists(editedPlaylist.id))
            }
        }
    }


    return (
        <div>
            <div>
                <h2>
                    Edit Playlist
                </h2>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        <ul style={{ padding: '10px', color: 'red', listStyle: 'none', textAlign: 'center' }}>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div>
                    <form onSubmit={handleSubmit}>
                        <label className='required-field create-label'>
                            Name:
                            <input
                                // maxLength={41}
                                className=""
                                type='text'
                                // placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label className='required-field create-label'>
                            Image:
                            <input
                                // maxLength={41}
                                className=""
                                type='text'
                                // placeholder="Name"
                                value={imageUrl}
                                onChange={(e) => setPreviewImage(e.target.value)}
                            />
                        </label>
                        <div>
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
