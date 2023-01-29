
import { createSong } from "../../store/songs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const CreateSong = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [previewImage, setPreviewImage] = useState(null)
    const [url, setSelectedFile] = useState(null)
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [boolean, setBoolean] = useState(false)

    const { albumId } = useParams()

    useEffect(() => {
        const error = []
        if (!title.length) error.push('Song title is required')
        if (title.length > 40) error.push('Song title must be less than 40 characters')
        if (!url) error.push('Audio is required')
        // if (!previewImage) error.push('Image is required')

        if (description.length > 255) error.push('Description can only be 255 characters long')

        setValidationErrors(error)
    }, [title, url, previewImage, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const song = {
            title,
            description,
            previewImage,
            url,
        }
        if (!validationErrors.length) {
            setBoolean(true)
            let createdSong = await dispatch(createSong(song, albumId))

            if (createdSong) { history.push(`/songs/${createdSong.id}`) }
        }
    }
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setSelectedFile(file);
    };
    // for multiple file upload
    // const updateFiles = (e) => {
    //     const files = e.target.files;
    //     setImages(files);
    // };

    const updateFileImage = (e) => {
        const file = e.target.files[0];
        if (file) setPreviewImage(file);
    };

    return (
        <>
            <div className="create-album-container">
                <h2 className="create-album-title">Upload Song</h2>
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
                            Upload a song file:
                            <input
                                className="custom-file-upload create-input"
                                type='file'
                                onChange={updateFile}
                                accept='audio/*'
                            // value={url}
                            // className="audio"
                            // placeholder="Accepted file types: mp3"
                            />
                        </label>
                        <label className='required-field create-label'>
                            Upload Image (PNG or JPEG):
                            <input
                                className="custom-file-upload create-input"
                                type='file'
                                onChange={updateFileImage}
                                accept="image/png, image/jpeg"
                            />
                            {/* <input
                                placeholder="Accepted file types: png, jpeg, jpg"
                                className="create-input"
                                type='text'
                                value={imageUrl}
                                onChange={(e) => setPreviewImage(e.target.value)}
                            /> */}
                        </label>
                        <label className="create-label">
                            Description:
                            <textarea
                                className="create-input text-area1"
                                maxLength='256'
                                wrap="hard"
                                spellCheck={true}
                                type='text'
                                placeholder="Describe your song"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>

                    </div>
                    <div className="button-container">
                        <p className='required-field-end bottom-words'> Required fields</p>
                        <div style={{ paddingRight: '7.3em' }}>
                            {boolean ?
                                <div>

                                    <button
                                        className="button-spinner"
                                        disabled={true}>UPLOADING
                                        <div className="spin"></div>
                                    </button>
                                </div>
                                :
                                <button className="save-create-button" type="submit">Save</button>
                            }
                            {/* <button onClick={handleCancelClick} type="button">Cancel</button> */}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default CreateSong
