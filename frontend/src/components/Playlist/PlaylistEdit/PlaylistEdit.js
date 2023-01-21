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
            <h2 className="create-album-title">
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
                    <div className="create-div">

                        <label className='required-field create-label'>
                            Name:
                            <input
                                // maxLength={41}
                                className="create-input"
                                type='text'
                                // placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label className='create-label'>
                            Image:
                            <input
                                // maxLength={41}
                                className="create-input"
                                type='text'
                                // placeholder="Name"
                                value={imageUrl}
                                onChange={(e) => setPreviewImage(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="button-container">
                        <p className='required-field-end bottom-words'> Required fields</p>
                        <div style={{ paddingRight: '5.9em' }}>
                            <button className="save-create-button" type="submit">Save</button>
                            {/* <button onClick={handleCancelClick} type="button">Cancel</button> */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
