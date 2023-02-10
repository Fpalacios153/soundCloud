import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPlaylist } from "../../../store/playlist";

export default function CreatePlaylist() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [imageUrl, setPreviewImage] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([[]])

    useEffect(() => {
        const errors = []
        if (!name.length) errors.push('Name required')
        if (name.length > 60) errors.push('Name must be less than 60 characters')
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
            let newPlaylist = await (dispatch(createPlaylist(playlist)))
            if (newPlaylist) {
                history.push(`/playlists/${newPlaylist.id}`)
            }
        }
    }


    return (
        <div>
            <h2 className="create-album-title">
                Create Playlist
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
                                maxLength={61}
                                className="create-input"
                                type='text'
                                placeholder="Playlist Name"
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
                                placeholder="Accepts jpeg, jpg,and png formats"
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
