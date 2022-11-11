import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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


    return (
        <div>
            <div>
                <h2>
                    Create Playlist
                </h2>
                <div>
                    <form>
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
                    </form>
                </div>
            </div>
        </div>
    )
}
