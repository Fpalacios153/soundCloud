import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAlbum } from '../../store/albums'



const EditAlbum = ({ setShowModal }) => {
    const { albumId } = useParams()
    const album = useSelector(state => state.albums[Number(albumId)])
    const dispatch = useDispatch()
    // const history = useHistory()
    const [title, setTitle] = useState(album.title)
    const [description, setDescription] = useState(album.description)
    const [imageUrl, setPreviewImage] = useState(album.previewImage)
    const [validationErrors, setValidationErrors] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() => {
        const errors = []
        if (!title.length) errors.push('Title required')
        if (title.length > 40) errors.push('Song title must be less than 40 characters')

        if (!imageUrl.includes('.png') && !imageUrl.includes('.jpeg') && !imageUrl.includes('.jpg')) errors.push('Image must be in jpeg, jpg or png format')
        if (description.length > 255) errors.push('Description can only be 255 characters long')
        setValidationErrors(errors)
    }, [title, imageUrl, description])

    // const user = useSelector(state => state.session.user)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const album = {
            title,
            description,
            imageUrl,

        }
        if (!validationErrors.length) {
            await dispatch(editAlbum(album, albumId))
            await setShowModal(false)

        }
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setHasSubmitted(true)

    //     const album = {
    //         title,
    //         description,
    //         imageUrl,

    //     }
    //     if (!title.length) {
    //         setValidationErrors([]);
    //         // history.push(`/you/library`)
    //         return dispatch(editAlbum(album, albumId))
    //             .catch(async (res) => {
    //                 const data = await res.json();
    //                 if (data && data.errors) setValidationErrors(data.errors)
    //             })
    //     }
    //     if (title.length) {
    //         setValidationErrors([]);
    //         history.push(`/you/library`)
    //         return dispatch(editAlbum(album, albumId))
    //     }
    // }



    // const handleCancelClick = (e) => {
    //     e.preventDefault();
    // };
    return (
        <>
            <div className="create-album-container">
                <h2 className="create-album-title">Edit Album</h2>
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

export default EditAlbum
