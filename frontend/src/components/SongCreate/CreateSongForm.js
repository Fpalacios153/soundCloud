
import { createSong } from "../../store/songs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const CreateSong = ({ createNew, setCreateNew }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setPreviewImage] = useState('')
    const [url, setSelectedFile] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const { albumId } = useParams()

    // const user = useSelector(state => state.session.user)
    useEffect(() => {
        const error = []
        if (!title.length) error.push('Song title is required')
        if (title.length > 40) error.push('Song title must be less than 40 characters')
        if (!url.length) error.push('Audio is required')
        if (!url.endsWith('.mp3')) error.push('Audio file must be in mp3 format')
        if (!imageUrl.includes('.png') && !imageUrl.includes('.jpeg') && !imageUrl.includes('.jpg')) error.push('Image must be in jpeg, jpg or png format')
        if (description.length > 255) error.push('Description can only be 255 characters long')

        setValidationErrors(error)
    }, [title, url, imageUrl, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const song = {
            title,
            description,
            imageUrl,
            url
        }
        // if (!song.imageUrl.length) { return setPreviewImage('https://res.cloudinary.com/fpalacios153/image/upload/v1659330814/Screen_Shot_2022-07-31_at_10.12.51_PM_npyums.png') }
        if (!validationErrors.length) {

            let createdSong = await dispatch(createSong(song, albumId))

            if (createdSong) { history.push(`/api/songs/${createdSong.id}`) }
        }

        // if (!title.length || !url.length) {
        //     setValidationErrors([]);
        //     return dispatch(createSong(song, albumId))
        //         .catch(async (res) => {
        //             const data = await res.json();
        //             if (data && data.errors) setValidationErrors(data.errors)
        //         })
        // }
        // if (title.length && url.length) {
        //     setValidationErrors([]);
        //     return dispatch(createSong(song, albumId)).then(() => history.push(`/you/library`))
        //     history.push(`/you/library`)
        // }
    }


    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     // history.push('/')
    // };
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
                            Upload a file:
                            <input
                                className="create-input"
                                // className="audio"
                                placeholder="Accepted file types: mp3"
                                type='text'
                                value={url}
                                onChange={(e) => setSelectedFile(e.target.value)}
                            />
                        </label>
                        <label className='required-field create-label'>
                            Upload Image:
                            <input
                                placeholder="Accepted file types: png, jpeg, jpg"
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
                                placeholder="Describe your song"
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
export default CreateSong
