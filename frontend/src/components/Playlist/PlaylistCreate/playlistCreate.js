import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaylist } from "../../../store/playlist";

export default function CreatePlaylist() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([[]])

    useEffect(() => {
        const errors = []
        if (!name.length) errors.push('Name required')
        if (!previewImage.includes('.png') && !previewImage.includes('.jpeg') && !previewImage.includes('.jpg')) errors.push('Image must be in jpeg, jpg or png format')
        setValidationErrors(errors)
    }, [name, previewImage])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)


        const playlist = {
            name,
            previewImage
        }
        if (!validationErrors.length) {
            let newPlaylist = await (dispatch(createPlaylist(playlist)))
            if (newPlaylist) {
                history.push(`/playlist/${newPlaylist.id}`)
            }
        }
    }


    return (
        <div>
            <div>
                <h2>
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
                                value={previewImage}
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
