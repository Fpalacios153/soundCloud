import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSong } from "../../store/songs";



export const EditSong = ({ setEdited, edited, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { songId } = useParams()
    const song = useSelector(state => state.songs[songId])


    const [title, setTitle] = useState(song.title)
    const [description, setDescription] = useState(song.description)
    const [imageUrl, setPreviewImage] = useState(song.previewImage)
    const [url, setSelectedFile] = useState(song.url)
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const error = []
        if (!title.length) error.push('Song title is required')
        if (!url.length) error.push('Audio is required')
        if (title.length > 40) error.push('Song title must be less than 40 characters')

        if (!url.endsWith('.mp3')) error.push('Audio file must be in mp3 format')
        if (!imageUrl.includes('.png') && !imageUrl.includes('.jpeg') && !imageUrl.includes('.jpg')) error.push('Image must be in jpeg, jpg or png format')
        if (description.length > 255) error.push('Description can only be 255 characters long')

        setValidationErrors(error)
    }, [title, url, imageUrl, description])
    // const user = useSelector(state => state.session.user)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const song = {
            title,
            description,
            imageUrl,
            url
        }
        if (!validationErrors.length) {

            await dispatch(editSong(song, songId))
            await setShowModal(false)
        }

    }



    return (
        <>
            <div className="create-album-container">
                <h2 className="create-album-title">Edit Song</h2>
                {validationErrors.length > 0 && (
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
                            Upload a file:
                            <input
                                className="create-input"
                                // className="audio"
                                type='text'
                                value={url}
                                onChange={(e) => setSelectedFile(e.target.value)}
                            />
                        </label>
                        <label className='required-field create-label'>
                            Upload Image:
                            <input
                                className="create-input"
                                type='text'
                                value={imageUrl}
                                onChange={(e) => setPreviewImage(e.target.value)}
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
