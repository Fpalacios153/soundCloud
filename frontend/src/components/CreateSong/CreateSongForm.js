
import { createSong } from "../../store/songs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export const CreateSongg = () => {
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


    // setValidationErrors(errors)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const song = {
            title,
            description,
            imageUrl,
            url
        }

        if (title.length && url.length) {
            setValidationErrors([]);
            history.push(`/you/library`)
            return dispatch(createSong(song, albumId))
                .catch(async (res) => {
                    const data = await res.json();
                    console.log('THIS', data)
                    if (data && data.errors) setValidationErrors(data.errors)
                })

        }
        console.log('--------', validationErrors)
        return setValidationErrors(['Title required'])

    }


    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/')
    };
    return (
        <>
            <h2>Upload Song</h2>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label className='required-field'>
                    Title
                    <input
                        type='text'
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <input
                        type='text'
                        placeholder="Describe your track"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Upload Image
                    <input
                        className="image"
                        type='text'
                        value={imageUrl}
                        onChange={(e) => setPreviewImage(e.target.value)}
                    />
                </label>
                <label>
                    Upload a file
                    <input
                        className="audio"
                        type='text'
                        value={url}
                        onChange={(e) => setSelectedFile(e.target.value)}
                    />
                </label>
                <button type="submit">Save</button>
                <button onClick={handleCancelClick} type="button">Cancel</button>
            </form>
        </>
    )
}
