import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbum } from "../../../store/albums"
import './CreateAlbum.css'



const CreateAlbum = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [previewImage, setPreviewImage] = useState(null)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState([[]])



    useEffect(() => {
        const errors = []
        if (!title.length) errors.push('Title required')
        // if (!imageUrl.includes('.png') && !imageUrl.includes('.jpeg') && !imageUrl.includes('.jpg')) errors.push('Image must be in jpeg, jpg or png format')
        if (description.length > 255) errors.push('Description can only be 255 characters long')
        if (title.length > 40) errors.push('Song title must be less than 40 characters')

        setValidationErrors(errors)
    }, [title, previewImage, description])

    // const user = useSelector(state => state.session.user)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const album = {
            title,
            description,
            previewImage,

        }
        if (!validationErrors.length) {
            let newAlbum = await dispatch(createAlbum(album))

            if (newAlbum) {
                history.push(`/albums/${newAlbum.id}`)
            }
        }

    }
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setPreviewImage(file)
    }
    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     history.push('/upload')
    // };
    return (
        <>
            <div className="create-album-container">
                <h2 className="create-album-title">Upload Album</h2>
                {hasSubmitted && validationErrors.length > 0 && (
                    <div>
                        <ul style={{ padding: '10px', color: 'red', listStyle: 'none', textAlign: 'center' }}>
                            {validationErrors.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="create-div">

                        <label className='required-field create-label'>
                            Title:
                            <input
                                maxLength={41}
                                className="create-input"
                                type='text'
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label className='required-field create-label'>
                            Upload Image(PNG or JPEG):
                            <input
                                // placeholder="Accepted file types: png, jpeg, jpg"
                                // value={updateFile}
                                className="custom-file-upload create-input"
                                type='file'
                                onChange={updateFile}
                                accept="image/png, image/jpeg"
                            />
                        </label>
                        <label className="create-label">
                            Description:
                            <textarea
                                className="create-input text-area1"
                                maxLength='256'
                                wrap="hard"
                                spellCheck={true}
                                type='text'
                                placeholder="Describe your album"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="button-container">
                        <p className='required-field-end bottom-words'> Required fields</p>
                        <div style={{ paddingRight: '7.3em' }}>
                            <button className="save-create-button" type="submit">Save</button>
                            {/* <button onClick={handleCancelClick} type="button">Cancel</button> */}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateAlbum
